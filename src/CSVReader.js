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
            amount: parseFloat(row['Purchase Amount'].replace(/[^\d.-]/g, "")),
        }));
        const groupedByCategory = transactions.reduce((acc, transaction) => {
            console.log(transaction.category)
            const category = transaction.category;
            if (!acc[category]) {
              acc[category] = { category, total: 0 };
            }
            acc[category].total += transaction.amount;
            return acc;
          }, {});
        const sortedByCategory = Object.values(groupedByCategory).sort((a, b) =>
          b.total - a.total
        );
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
        
        const sortedByMonth = Object.values(groupedByMonth).sort((a, b) =>
            new Date(a.monthYear) - new Date(b.monthYear)
        );
        console.log(sortedByCategory)
        setTransactions(sortedByMonth);
        setTotalsByCategory(sortedByCategory);
        setInitialTransactions(transactions);
        handleData(sortedByMonth);
        },
    });
    };

    useEffect(() => {
    if (initialTransactions.length > 0) {
        renderTable();
    }
    }, [initialTransactions]);

    const renderTable = () => {
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
    return (
    <div>
        <input type="file" onChange={handleFileUpload} />
        {totalsByCategory.length > 0 && (
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
      )}
        {transactions.length > 0 && renderTable()}
    </div>
    );
}

export default CSVReader;
