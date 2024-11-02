"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { UseFinanceContext } from "../../context/finaceContext";
import { ExpenseType } from "@/type/expenseType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const { expense } = UseFinanceContext();

  const data = {
    labels: expense.map((items: ExpenseType) => items.title),

    datasets: [
      {
        label: "Expenses",
        data: expense.map((items: ExpenseType) => items.amount),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Change from string to boolean
      },
      title: {
        display: true,
        text: "Your Chart Title", // Make sure this is a string
      },
    },
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center  bg-slate-50">
      <div className=" fixed stats-parent w-screen flex justify-center items-center flex-col">
        <h1 className="text-xl font-bold">Expense Chart</h1>
        <div className=" char-child h-[300px] w-full flex justify-center items-center ">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
