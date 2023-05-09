import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Credit Card Transactions",
    },
    xAxis: {
        title: {
            text: "Months",
        },
        categories: data.map((row) => row.Date),
    },
    yAxis: {
        title: {
            text: "$ value",
        },
    },
    series: [
      {
        name: "Amount",
        data: data.map((row) => parseFloat(row["Purchase Amount"].replace(/[^0-9.-]+/g, ""))),
      },
    ],
  };
  console.log(data)
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChart;
