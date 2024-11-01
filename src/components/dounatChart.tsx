// components/DonutChart.js
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// import { UseFinanceContext } from "@/context/finaceContext";

Chart.register(ArcElement, Tooltip, Legend);
interface DonutChartProps {
  data: {
    labels: string[];
    values: number[];
    backgroundColor: string[];
  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const { expense } = UseFinanceContext();
  useEffect(() => {
    // Check if chartRef.current is not null
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
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

        // Cleanup function to destroy the chart on unmount
        return () => {
          myChart.destroy();
        };
      }
    }
  }, [data]);
  // useEffect(() => {
  //   const ctx = chartRef.current.getContext("2d");
  //   const myChart = new Chart(ctx, {
  //     type: "doughnut",
  //     data: {
  //       labels: data.labels,
  //       datasets: [
  //         {
  //           label: "Expense",
  //           data: data.values,
  //           backgroundColor: data.backgroundColor,
  //           borderColor: "white",
  //           borderWidth: 2,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: "top",
  //         },
  //         tooltip: {
  //           callbacks: {
  //             label: function (tooltipItem) {
  //               return `${tooltipItem.label}: ${tooltipItem.raw}`;
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   return () => {
  //     myChart.destroy();
  //   };
  // }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;
