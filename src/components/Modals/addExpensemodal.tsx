import { useState } from "react";
import { MdOutlineAttachMoney, MdOutlineTitle } from "react-icons/md";
import Modol from "../modol";
import { auth } from "@/firebase/authentication";
import { UseFinanceContext } from "@/context/finaceContext";
import { ExpenseType } from "@/type/expenseType";
//  type
type show_incloseType = {
  show: boolean;
  onclose: (open: boolean) => void;
};

export default function AddExpense({ show, onclose }: show_incloseType) {
  // const [modolIsOpen, setmodolIsOpen] = useState(false);
  const [title, settitle] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [amount, setamount] = useState<number | string>("");
  const [categorie, setcategorie] = useState<string>("");
  const [note, setnote] = useState<string>("");

  // for color to check color in hexadecimal
  const handleColorChange = (newColor: string) => {
    const isValidColor = /^#[0-9A-Fa-f]{6}$/.test(newColor);
    if (isValidColor) {
      setColor(newColor);
    } else {
      console.error("Invalid color format:", newColor);
      // Optionally, set to a default color or handle the error
    }
  };

  // get expense add function from finance context
  const { AddExpense } = UseFinanceContext();
  // add
  const addexpenseHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const uid = auth.currentUser?.uid;
    const expenseData: ExpenseType = {
      color,
      title,
      amount,
      categorie,
      note,
      createdAt: new Date(),
      uid,
      index: 0,
      id: "",
    };

    // firestore

    try {
      AddExpense(expenseData);
      // const collectionRef = collection(db, "expense");
      // await addDoc(collectionRef, expense);
    } catch (error) {
      console.log(error);
    }

    settitle("");
    setamount("");
    setcategorie("");
    setnote("");
  };

  return (
    <Modol ModelOpen={show} setModelOpen={onclose}>
      {/* modal children */}
      <div className="flex justify-center ">
        <div className="expense-modal flex justify-center  gap-7 mt-[50px] w-10/12">
          <form
            action=""
            onSubmit={addexpenseHandler}
            className="flex gap-5 flex-col justify-center w-full mx-auto "
          >
            {/* title input */}
            <div className="relative w-full">
              <div className="absolute top-6 inset-y-0 start-0 flex items-center ps-3 pointer-events-none  text-slate-400">
                {/* title icon */}
                <MdOutlineTitle />
              </div>
              <label htmlFor="title">title</label>
              <input
                type="text"
                id="title"
                className="bg-gray-50 border tracking-widest border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search branch name..."
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                // ref={titleRef}
                required
              />
            </div>

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
                placeholder="Enter amount"
                value={amount}
                // value={amount ?? ""} // If email is null, use an empty string
                onChange={(e) => {
                  const expenseVal = +e.target.value;
                  setamount(expenseVal);
                }}
                required
              />
            </div>

            {/* category */}
            <div className="relative w-full">
              <>
                <label>categories</label>
                <select
                  id="options"
                  className="text-white w-full bg-slate-500   focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                  required
                  value={categorie}
                  onChange={(e) => {
                    setcategorie(e.target.value);
                  }}

                  // ref={CategoriRef}
                >
                  <option className="text-start tracking-widest" value="">
                    Categories
                  </option>
                  <option className="text-start tracking-widest" value="Bills">
                    Bills
                  </option>
                  <option className="text-start tracking-widest" value="Food">
                    Food
                  </option>
                  <option
                    className="text-start tracking-widest"
                    value="Shopping"
                  >
                    Shopping
                  </option>
                  <option
                    className="text-start tracking-widest"
                    value="Entertainment"
                  >
                    Entertainment
                  </option>
                  <option
                    className="text-start tracking-widest"
                    value="Education fee"
                  >
                    Education fee
                  </option>
                  <option
                    className="text-start tracking-widest"
                    value="Medicine"
                  >
                    Medicine
                  </option>
                  <option className="text-start tracking-widest" value="Other">
                    Other
                  </option>
                </select>
              </>
            </div>

            {/* color */}
            <div className="relative w-full flex flex-col">
              <label htmlFor="title">Color</label>
              <input
                type="color"
                id="color"
                className="h-[30px] p-1 rounded-sm"
                placeholder=""
                value={color}
                onChange={(e) => {
                  handleColorChange(e.target.value);
                }}
                // ref={titleRef}
                required
              />
            </div>

            {/* note */}
            <div className="relative w-full">
              <label htmlFor="text note"> text note </label>
              <textarea
                name=""
                id="text note"
                className="ps-5 pt-5 w-full rounded-md tracking-widest"
                placeholder="Discription note"
                //  ref={NoteRef}
                value={note}
                onChange={(e) => {
                  setnote(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="flex justify-start ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                // onClick={addexpenseHandler}
                type="submit"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modol>
  );
}
