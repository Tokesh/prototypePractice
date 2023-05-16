import React, { useState } from "react";
import CSVReader from "./CSVReader";
import BarChart from "./BarChart";
import Header from "./Header";

const App = () => {
  const [csvData, setCsvData] = useState([]);

  const handleCsvData = (data) => {
    const last12MonthsData = data.slice(-12);
    setCsvData(last12MonthsData);
  };

  return (
    <div>
      <Header />
      <CSVReader handleData={handleCsvData} />
      {csvData.length > 0 && <BarChart data={csvData} />}
    </div>
  );
};

export default App;
