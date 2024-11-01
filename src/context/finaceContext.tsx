"use client";
import { db } from "@/firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { UseAuthContext } from "@/context/authcontext";
import { auth } from "@/firebase/authentication";
import { incomeDataType } from "@/type/incometype";
import { ExpenseType } from "@/type/expenseType";
type FinanceContextType = {
  AddIncomeData: (incomeData: incomeDataType) => void;
  AddExpense: (expenseData: ExpenseType) => void;
  expense: ExpenseType[];
  income: incomeDataType[];
  deleteExpenseData: (id: string) => void;
  DelteIncome: (id: string) => void;
};

const FinanceContext = createContext<FinanceContextType>({
  income: [],
  expense: [],
  deleteExpenseData: async () => {},
  AddExpense: async () => {},
  AddIncomeData: async () => {},
  DelteIncome: async () => {},
});

export default function FinanceContextRapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expense, setExpense] = useState<ExpenseType[]>([]);
  const [income, setIncome] = useState<incomeDataType[]>([]);

  // type incomeType = {
  //   id: string;
  //   createdAt: string | Date;
  // };

  // user from authContext
  const authContext = UseAuthContext();
  const user = authContext?.user; // user will be undefined if authContext is null

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
    if (user) {
      const FetchData = async () => {
        const currentUserUID = auth.currentUser?.uid;
        console.log("Effect working");
        const q = query(
          collection(db, "income"),
          where("uid", "==", currentUserUID)
        );
        // get data real time
        onSnapshot(q, (querySnapshot) => {
          const userIncome = querySnapshot.docs.map((incmeDoc) => ({
            ...(incmeDoc.data() as incomeDataType),
            // ...incmeDoc.data(),
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
        // let currentUserUId = auth.currentUser?.uid;
        const collectionRef = collection(db, "expense");
        const condition = where("uid", "==", auth.currentUser?.uid);
        const q = query(collectionRef, condition);

        // get data real time
        onSnapshot(q, (QuerySnapShot) => {
          const userExpense = QuerySnapShot.docs.map((ExpenseDoc) => ({
            ...(ExpenseDoc.data() as ExpenseType),
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
