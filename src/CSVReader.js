import React, { useState, useEffect } from 'react';

import Papa from "papaparse";


function CSVReader({ handleData }) {
    const [transactions, setTransactions] = useState([]);
    const [initialTransactions, setInitialTransactions] = useState([]);
    const [totalsByCategory, setTotalsByCategory] = useState({});

    const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
        header: true,
        complete: function (results) {
          const transactions = results.data.map((row) => ({
            date: new Date(row.Date),
            description: row.Description,
            category: row.Type,
            amount: parseFloat((row['Purchase Amount'] || '').replace(/[^0-9.-]/g, '').replace(/,"/g, ''))
          }));
          // const transactions = results.data.map((row) => {
          //   const amountString = row['Purchase Amount'].replace(/[^0-9.-]/g, '');
            
          //   console.log(`Amount string: ${amountString}`);
          
          //   return {
          //     date: new Date(row.Date),
          //     description: row.Description,
          //     category: row.Type
          //   };
          // });

          const groupedByCategory = transactions.reduce((acc, transaction) => {
              const category = transaction.category;
              if (!acc[category]) {
                acc[category] = { category, total: 0 };
              }
              acc[category].total += transaction.amount;
              return acc;
            }, {});
          

          const groupedByMonth = transactions.reduce((acc, transaction) => {
              const monthYear = transaction.date.toLocaleString("default", {
              month: "long",
              year: "numeric",
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

          const sortedTransactions = transactions.sort((a, b) => a.date - b.date);

          setTransactions(sortedByMonth);
          setTotalsByCategory(sortedByCategory);
          setInitialTransactions(sortedTransactions);
          handleData(sortedByMonth);
        },
    });
    };

    useEffect(() => {
    if (initialTransactions.length > 0) {
        renderTableTransactions();
    }
    if(totalsByCategory.length > 0){
        renderTableCategory();
    }
    }, [initialTransactions, totalsByCategory]);

    const renderTableTransactions = () => {
    return (
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {initialTransactions.map((transaction, index) => (
                <tr key={index}>
                <td>{transaction.date && transaction.date.toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount ? transaction.amount.toFixed(2) : ''}</td>
                </tr>
            ))}
            </tbody>
        </table>
        );
    }
    const renderTableCategory = () => {
      return (
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total Spend</th>
              </tr>
            </thead>
            <tbody>
              {totalsByCategory.map((category, index) => (
                <tr key={index}>
                  <td>{category.category}</td>
                  <td>{category.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    
    return (
      <div>
          <input type="file" onChange={handleFileUpload} />
          {totalsByCategory.length > 0 && renderTableCategory()}
          {transactions.length > 0 && renderTableTransactions()}
      </div>
    );
}

export default CSVReader;
