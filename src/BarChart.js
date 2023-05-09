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
        categories: data.map((row) => row.monthYear),
      },
    yAxis: {
        title: {
            text: "$ value",
        },
    },
    series: [
        {
          name: "Amount",
          data: data.map((row) => row.total),
        },
      ],
  };
  console.log(data)
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChart;
