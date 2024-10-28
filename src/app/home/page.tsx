"use client";

import Header from "@/components/header";
import Expenses from "@/components/epenses";
import { useEffect, useState } from "react";
import AddExpense from "@/components/Modals/addExpensemodal";
import AddIncome from "@/components/Modals/incomeModal";
import { UseFinanceContext } from "../context/finaceContext";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { auth } from "@/firebase/authentication";
import { ExpenseType } from "@/type/expenseType";

export default function User() {
  const [balance, setBalance] = useState<number | null>(null);
  const [expensemodolIsOpen, setexpensemodolIsOpen] = useState<boolean>(false);
  const [incomeModalIsopen, setincomeModalIsopen] = useState<boolean>(false);
  const [userName, setuserName] = useState();
  // expense data from finance context

  const { expense, income } = UseFinanceContext();

  // for handle balance

  useEffect(() => {
    const add = () => {
      let sumExpense = 0;
      let sumIncome = 0;
      for (let i = 0; i < expense.length; i++) {
        sumExpense += expense[i].amount;
      }
      for (let i = 0; i < income.length; i++) {
        sumIncome += income[i].amount;
      }
      setBalance(sumIncome - sumExpense);
    };
    add();
  }, [expense, income]);

  // get username from firestore
  useEffect(() => {
    let user = auth.currentUser;
    if (user) {
      const getUserInfo = async () => {
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setuserName(docSnap.data().UserName);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      };
      getUserInfo();
    }
  }, []);

  return (
    <div>
      {/* income modal */}
      <AddIncome
        showIncome={incomeModalIsopen}
        oncloseIncome={setincomeModalIsopen}
      />
      {/* expenase modal */}

      <AddExpense show={expensemodolIsOpen} onclose={setexpensemodolIsOpen} />

      <div className="">
        <Header name={userName} />

        <section className=" flex justify-center mt-5 ">
          <div className="section-parent w-5/6 ">
            <div className=" bg-slate-50  rounded-xl p-5">
              <section className="section-first  ">
                <small className=" text-gray-800">MY BALANCE</small>
                <h2 className="font-bold text-4xl text-gray-600">${balance}</h2>
              </section>

              <section className="section-second flex gap-3 mt-9">
                <button
                  onClick={() => setexpensemodolIsOpen(true)}
                  className="btn btn-outline btn-error w-[110px]"
                >
                  + Expense
                </button>
                <button
                  onClick={() => setincomeModalIsopen(true)}
                  className="btn btn-outline btn-success w-[110px]"
                >
                  + Income
                </button>
                {/* <button
                onClick={() => setincomeModalIsopen(true)}
                className="income-btn border-2 border-green-900 text-green-900  py-2 px-4 rounded-3xl font-bold"
              >
                + Income
              </button> */}
              </section>
            </div>

            {/* expense section */}
            <section className="section-third mt-10">
              <h2 className="font-bold text-2xl  text-gray-400">My Expenses</h2>

              <div className="mt-2 flex flex-col gap-4">
                {expense.map((expenseData: ExpenseType, index: string) => {
                  return (
                    <Expenses
                      index={index}
                      createdAt={expenseData.createdAt.toISOString()}
                      id={expenseData.id}
                      key={expenseData.id}
                      title={expenseData.title}
                      note={expenseData.note}
                      categorie={expenseData.categorie}
                      color={expenseData.color}
                      amount={expenseData.amount}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
