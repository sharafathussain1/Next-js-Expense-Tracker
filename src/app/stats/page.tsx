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
import DonutChart from "@/components/dounatChart";
import { incomeDataType } from "@/type/incometype";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const { expense, income } = UseFinanceContext();

  const data = {
    labels: expense.map((items: ExpenseType) => items.title),

    datasets: [
      {
        label: "Expenses",
        data: expense.map((items: ExpenseType) => items.amount),
        backgroundColor: " rgb(252 165 165)",
        borderColor: "rgb(239 68 68)",
        borderWidth: 1,
      },
      {
        label: "Income",
        data: income.map((items: incomeDataType) => items.amount),
        backgroundColor: "rgb(217 249 157)",
        borderColor: "rgb(132 204 22)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: "flex",
      },
      title: {
        display: true,
        text: " Expense Data",
      },
    },
  };

  // for dounant
  const chartData = {
    labels: expense.map((items: ExpenseType) => items.title),
    values: expense.map((items: ExpenseType) => items.amount),
    backgroundColor: expense.map((items: ExpenseType) => items.color),
  };

  return (
    <div className=" fixed stats-parent h-screen w-screen bg-slate-50 flex justify-center items-center flex-col">
      <h1 className="text-xl font-bold">Expense Chart</h1>
      <div className=" char-child h-[300px] w-full flex justify-center items-center ">
        <Bar data={data} options={options} />
      </div>

      {/* donutchart  */}
      <div className=" donutchart mt-3">
        <h1 className="text-center">Expense chart</h1>
        <DonutChart data={chartData} />
      </div>
    </div>
  );
}
