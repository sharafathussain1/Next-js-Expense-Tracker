// components/DonutChart.js
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ExpenseType } from "@/type/expenseType";
import { UseFinanceContext } from "@/app/context/finaceContext";

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }: any) => {
  const chartRef = useRef(null);
  const { expense } = UseFinanceContext();
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Expense",
            data: data.values,
            backgroundColor: data.backgroundColor,
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              },
            },
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
