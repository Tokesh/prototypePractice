import React, { useState } from "react";
import Papa from "papaparse";

function CSVReader() {
  const [transactions, setTransactions] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const transactions = results.data.map((row) => ({
          date: new Date(row.Date),
          amount: parseFloat(row['Purchase Amount'].replace(/[^\d.-]/g, "")),
        }));
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
        setTransactions(sortedByMonth);
      },
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default CSVReader;


// import React from "react";
// import Papa from "papaparse";

// const CSVReader = ({ handleData }) => {
//   const handleFileUpload = (event) => {
//     Papa.parse(event.target.files[0], {
//       header: true,
//       complete: (results) => {
//         handleData(results.data);
//       },
//     });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//     </div>
//   );
// };

// export default CSVReader;