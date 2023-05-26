import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import RenderTableTransactions from './RenderTableTransactions';
import RenderTableCategory from './RenderTableCategory';
import BarChart from './BarChart';

const RootContainer = styled('div')({
  margin: '2rem',
});

const FileInputContainer = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const FileInputLabel = styled('label')({
  marginRight: '1rem',
});

const FileInputButton = styled(Button)({
  // Add your custom styles here
});

const ClearButton = styled(Button)({
  marginLeft: '1rem',
  // Add your custom styles here
});

const FileInput = styled('input')({
  display: 'none',
});


function CSVReader({ handleData }) {
  const [transactions, setTransactions] = useState([]);
  const [initialTransactions, setInitialTransactions] = useState([]);
  const [totalsByCategory, setTotalsByCategory] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result;

      const lines = contents.split('\n');
      
      const updatedLines = lines.map((line) => {
        if(!line.startsWith('"')) return line;
        let isInQuotes = false;
        let updatedLine = '';
        // console.log(line)
        
        line = line.replace(/""/g, '"');
        if(line.startsWith('"')) line = line.substring(1, line.length - 1);

        // console.log(line)
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"' ) {
            isInQuotes = !isInQuotes;
          }
          if (char === ',' && isInQuotes) {
            updatedLine += '';
          } else if(char !== '"'){
            updatedLine += char;
          }
          
        }
        return updatedLine + '\r';
      });
    console.log(updatedLines)
    const updatedContents = updatedLines.join('\n');

    console.log(updatedContents);
    Papa.parse(updatedContents, {
      header: true,
      delimiter: ',',
      complete: function (results) {
        console.log(results)
        const transactions = results.data.map((row, index) => {
          const amount = parseFloat(row['Purchase Amount'].replace(/[^0-9.-]/g, '').replace(/,/g, ''));
          return {
            date: new Date(row.Date),
            description: row.Description,
            category: row.Type,
            amount: isNaN(amount) ? row['Purchase Amount'] : amount,
            row: index + 1,
          };
        });
  
          const sortedTransactions = transactions.sort((a, b) => a.date - b.date);

        const lastTransactionDate = sortedTransactions[sortedTransactions.length - 1].date;
        const twelveMonthsAgo = new Date(lastTransactionDate).setFullYear(new Date(lastTransactionDate).getFullYear() - 1);

        const filteredTransactions = sortedTransactions.filter((transaction) => transaction.date >= twelveMonthsAgo);

        const groupedByCategory = filteredTransactions.reduce((acc, transaction) => {
          const category = transaction.category;
          if (!acc[category]) {
            acc[category] = { category, total: 0 };
          }
          acc[category].total += transaction.amount;
          return acc;
        }, {});

        const groupedByMonth = filteredTransactions.reduce((acc, transaction) => {
          const monthYear = transaction.date.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          });
          if (!acc[monthYear]) {
            acc[monthYear] = { monthYear, total: 0 };
          }
          acc[monthYear].total += transaction.amount;
          return acc;
        }, {});

        const sortedByCategory = Object.values(groupedByCategory).sort((a, b) =>
          b.total - a.total
        );

        const sortedByMonth = Object.values(groupedByMonth).sort((a, b) =>
          new Date(a.monthYear) - new Date(b.monthYear)
        );

        setTransactions(sortedByMonth);
        setTotalsByCategory(sortedByCategory);
        setInitialTransactions(filteredTransactions);
        handleData(sortedByMonth);
        },
        delimiter: ',', // Установка разделителя
      });
    };
  
    reader.readAsText(file);

    setFileInputKey((prevKey) => prevKey + 1);
  };
  

  const handleClearData = () => {
    setTransactions([]);
    setInitialTransactions([]);
    setTotalsByCategory([]);
    setFileInputKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (initialTransactions.length > 0) {
      renderTableTransactions();
    }
  }, [initialTransactions]);

  const renderTableTransactions = () => {
    return <RenderTableTransactions transactions={initialTransactions} />;
  };

  return (
    <RootContainer>
      <FileInputContainer>
        <FileInputLabel htmlFor="file-upload">
          <FileInputButton variant="contained" component="span">
            Choose File
          </FileInputButton>
        </FileInputLabel>
        <FileInput
          id="file-upload"
          key={fileInputKey}
          type="file"
          onChange={handleFileUpload}
        />
        {initialTransactions.length > 0 && (
          <ClearButton variant="contained" onClick={handleClearData}>
            Clear Data
          </ClearButton>
        )}
      </FileInputContainer>
      <BarChart data={transactions} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RenderTableCategory totalsByCategory={totalsByCategory} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RenderTableTransactions transactions={initialTransactions} />
        </Grid>
      </Grid>
    </RootContainer>
  );
}

export default CSVReader;