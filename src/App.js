import React, { useState } from "react";
import CSVReader from "./CSVReader";
import BarChart from "./BarChart";

const App = () => {
  const [csvData, setCsvData] = useState([]);

  const handleCsvData = (data) => {
    const last12MonthsData = data.slice(-12);
    setCsvData(last12MonthsData);
  };

  return (
    <div>
      <CSVReader handleData={handleCsvData} />
      <BarChart data={csvData} />
    </div>
  );
};

export default App;
