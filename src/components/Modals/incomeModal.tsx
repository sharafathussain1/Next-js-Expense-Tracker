import { useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import Modol from "../modol";
import { FaRegStickyNote } from "react-icons/fa";
import { auth } from "@/firebase/authentication";
import { UseFinanceContext } from "@/context/finaceContext";
import { FcBullish, FcFullTrash } from "react-icons/fc";
import { incomeDataType } from "@/type/incometype";
//  type
type showIncome_oncloseIncomeType = {
  showIncome: boolean;
  oncloseIncome: (open: boolean) => void;
};

export default function AddIncome({
  showIncome,
  oncloseIncome,
}: showIncome_oncloseIncomeType) {
  const [description, setdescription] = useState<string>("");
  const [amount, setamount] = useState<string | number>("");

  // data from financeContextapi
  const { income, AddIncomeData, DelteIncome } = UseFinanceContext();
  //  add income handler
  const addincomeHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const uid = auth.currentUser?.uid;
    const incomeData: incomeDataType = {
      id: "id",
      amount,
      description,
      createdAt: new Date(),
      uid,
    };

    // firestore
    try {
      AddIncomeData(incomeData);
      setamount("");
      setdescription("");
    } catch (error) {
      console.log(error);
    }
  };

  //   delete income history

  const delteIncomeHistory = async (id: string) => {
    try {
      // DelteIncome this function from finance context
      DelteIncome(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modol ModelOpen={showIncome} setModelOpen={oncloseIncome}>
      {/* modal children */}
      <div className="flex justify-center">
        <div className="expense-modal  flex flex-col justify-center  gap-7 mt-20 w-10/12 ">
          <form
            onSubmit={addincomeHandler}
            action=""
            className="flex gap-5 flex-col justify-center w-full mx-auto "
          >
            {/* amount input */}
            <div className="relative w-full">
              <div className="absolute top-6 inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-slate-400">
                {/* amount icon */}
                <MdOutlineAttachMoney />
              </div>
              <label htmlFor="Amount" className="text-slate-50">
                Amount
              </label>
              <input
                type="number"
                id="Amount"
                className="bg-gray-50 border tracking-widest border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter amount..."
                value={amount}
                // value={amount ?? ""} //if amount is null show empty string
                onChange={(e) => {
                  const amountval = +e.target.value;
                  setamount(amountval);
                }}
                required
              />
            </div>

            {/* discription input */}
            <div className="relative w-full">
              <div className="absolute top-6 inset-y-0 start-0 flex items-center ps-3 pointer-events-none  text-slate-400">
                {/*  icon */}
                <FaRegStickyNote />
              </div>
              <label htmlFor="title" className="text-slate-50">
                title
              </label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border tracking-widest border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount description..."
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                required
              />
            </div>

            <div className="flex justify-start ">
              <button
                type="submit"
                // onClick={addincomeHandler}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // className="border-1  py-2.5 px-5 bg-slate-400 text-slate-700 focus:border-4 font-semibold  focus:text-violet-50 focus:bg-slate-900 transition-all duration-1s"
              >
                Add Income
              </button>
            </div>
          </form>

          {/* Income History */}

          <div>
            <h3 className="text-xl font-semibold text-slate-50">
              Income History
            </h3>
            {/* here print income data  */}
            {income.map((dataIncome) => (
              <div
                key={dataIncome.id}
                className=" income-parent flex justify-between border-2  bg-slate-50 mt-4 p-2 rounded-xl"
              >
                <div className="flex gap-2 items-center  ">
                  <span className=" uparrow rounded-xl p-3 text-xl bg-green-200 text-green-500">
                    {/* <FaArrowTrendUp /> */}
                    <FcBullish />
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {dataIncome?.description}
                    </h4>
                    <h4 className="income-Date">
                      {dataIncome.createdAt.toString().split("GMT")[0]}
                    </h4>
                  </div>
                </div>
                <div className=" income-child flex items-center gap-4 ">
                  <h4 className="font-bold income-amount  text-green-500">
                    +${dataIncome?.amount}{" "}
                  </h4>
                  <span
                    onClick={() => {
                      delteIncomeHistory(dataIncome?.id);
                    }}
                    className=" cursor-pointer text-xl"
                  >
                    <FcFullTrash />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modol>
  );
}
