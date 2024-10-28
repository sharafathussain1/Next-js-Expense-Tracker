import { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineAttachMoney } from "react-icons/md";
import Modol from "../modol";
import { FaRegStickyNote } from "react-icons/fa";
import { auth } from "@/firebase/authentication";
import { UseFinanceContext } from "@/app/context/finaceContext";
import { FcBullish, FcFullTrash } from "react-icons/fc";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function AddIncome({ showIncome, oncloseIncome }) {
  //   const [modolIsOpen, setmodolIsOpen] = useState(false)
  const [discription, setdiscription] = useState<string>("");
  const [amount, setamount] = useState<string | number>("");
  // const [income, setIncome] = useState<any>([]);

  // User from contextapi
  // const { user } = UseAuthContext();
  // data from financeContextapi
  const { income, AddIncomeData, DelteIncome } = UseFinanceContext();
  //  add income handler
  const addincomeHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    let uid = auth.currentUser?.uid;
    const incomeData = {
      amount,
      discription,
      createdAt: new Date(),
      uid,
    };

    // firestore
    try {
      // AddIncomeData this function from finance context
      // add data in firestore
      await AddIncomeData(incomeData);
      setamount("");
      setdiscription("");
    } catch (error) {
      console.log(error);
    }
  };

  //   delete income history

  const delteIncomeHistory = async (id: string) => {
    try {
      // DelteIncome this function from finance context
      await DelteIncome(id);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch data

  // useEffect(() => {
  //   let readTodosRealtime;
  //   if (user) {
  //     const FetchData = async () => {
  //       let currentUserUID = user?.uid;
  //       console.log("Effect working");
  //       const q = query(
  //         collection(db, "income"),
  //         where("uid", "==", currentUserUID)
  //       );
  //       // get data real time
  //       readTodosRealtime = onSnapshot(q, (querySnapshot) => {
  //         let userIncome = querySnapshot.docs.map((incmeDoc) => ({
  //           ...incmeDoc.data(),
  //           id: incmeDoc.id,
  //           createdAt: new Date(incmeDoc.data().createdAt.toMillis()),
  //         }));
  //         setIncome(userIncome);
  //         //   console.log(userTodo);
  //       });
  //     };
  //     FetchData();
  //   }
  // }, [user]);

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
              <label htmlFor="Amount">Amount</label>
              <input
                type="number"
                id="Amount"
                className="bg-gray-50 border tracking-widest border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter amount..."
                value={amount}
                // value={amount ?? ""} //if amount is null show empty string
                onChange={(e) => {
                  let amountval = +e.target.value;
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
              <label htmlFor="title">title</label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border tracking-widest border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount description..."
                value={discription}
                onChange={(e) => {
                  setdiscription(e.target.value);
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
            <h3 className="text-xl font-semibold">Income History</h3>
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
                      {dataIncome?.discription}
                    </h4>
                    <h4 className="income-Date">
                      {dataIncome.createdAt.toISOString()}
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
