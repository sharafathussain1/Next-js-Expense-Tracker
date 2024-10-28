"use client";
import { db } from "@/firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { UseAuthContext } from "@/app/context/authcontext";
import { auth } from "@/firebase/authentication";
import { incomeDataType } from "@/type/incometype";
import { ExpenseType } from "@/type/expenseType";

const FinanceContext = createContext({});

export default function FinanceContextRapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  // type
  type UserExpenseType = {
    id: string;
    createdAt: Date;
  };

  // user from authContext
  const { user } = UseAuthContext();

  // Add income data
  const AddIncomeData = async (incomeData: incomeDataType) => {
    const collectionRef = collection(db, "income");
    await addDoc(collectionRef, incomeData);
  };

  // Delete income History
  const DelteIncome = async (id: string) => {
    const docRef = doc(db, "income", id);
    await deleteDoc(docRef);
  };

  // fetch income data
  useEffect(() => {
    let readTodosRealtime;
    if (user) {
      const FetchData = async () => {
        let currentUserUID = auth.currentUser?.uid;
        console.log("Effect working");
        const q = query(
          collection(db, "income"),
          where("uid", "==", currentUserUID)
        );
        // get data real time
        readTodosRealtime = onSnapshot(q, (querySnapshot) => {
          let userIncome = querySnapshot.docs.map((incmeDoc) => ({
            ...incmeDoc.data(),
            id: incmeDoc.id,
            createdAt: new Date(incmeDoc.data().createdAt.toMillis()),
          }));
          setIncome(userIncome);
          //   console.log(userTodo);
        });
      };
      FetchData();
    }
  }, [user]);

  // expense section

  // add expense data
  const AddExpense = async (expenseData: ExpenseType) => {
    const collectionRef = collection(db, "expense");
    await addDoc(collectionRef, expenseData);
  };

  // delte expense data
  const deleteExpenseData = async (id: string) => {
    const docRef = doc(db, "expense", id);
    await deleteDoc(docRef);
  };

  // fetch expense data
  useEffect(() => {
    if (user) {
      const fetchExpenseData = async () => {
        let readExpenseData;
        // let currentUserUId = auth.currentUser?.uid;
        const collectionRef = collection(db, "expense");
        const condition = where("uid", "==", auth.currentUser?.uid);
        const q = query(collectionRef, condition);

        // get data real time
        readExpenseData = onSnapshot(q, (QuerySnapShot) => {
          let userExpense = QuerySnapShot.docs.map((ExpenseDoc) => ({
            ...ExpenseDoc.data(),
            id: ExpenseDoc.id,
            createdAt: new Date(ExpenseDoc.data().createdAt.toMillis()),
          }));
          setExpense(userExpense);
        });
      };
      fetchExpenseData();
    }
  }, [user]);

  return (
    <FinanceContext.Provider
      value={{
        AddIncomeData,
        DelteIncome,
        income,
        expense,
        AddExpense,
        deleteExpenseData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const UseFinanceContext = () => {
  return useContext(FinanceContext);
};
