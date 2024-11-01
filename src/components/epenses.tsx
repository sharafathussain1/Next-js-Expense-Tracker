import { UseFinanceContext } from "@/context/finaceContext";
import { ExpenseType } from "@/type/expenseType";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";
import { FaMoneyBill1 } from "react-icons/fa6";
import { FcBearish, FcFullTrash } from "react-icons/fc";
import { ImFlattr } from "react-icons/im";

import { MdTitle } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { VscActivateBreakpoints } from "react-icons/vsc";

export default function Expenses({
  index,
  createdAt,
  id,
  title,
  amount,
  color,
}: ExpenseType) {
  const { deleteExpenseData, expense } = UseFinanceContext();
  const [ModalOpen, setModelOpen] = useState(false);

  // const [expenseList, seteXpenseList] = useState();
  const modalHandler = () => {
    ModalOpen ? setModelOpen(false) : setModelOpen(true);
  };
  const DeleteExpense = (id: string) => {
    deleteExpenseData(id);
    //  console.log(id);
  };

  // Convert createdAt to a string
  const displayDate =
    typeof createdAt === "string" ? createdAt : createdAt.toLocaleString(); // You can customize the format as needed

  return (
    <div className=" ">
      {/* here create a  moldal  that show detail of expense */}
      <div className="h-full flex justify-center items-center ">
        <div
          className="w-[300px] h-[250px]   rounded-lg bg-slate-800 absolute "
          style={{ display: ModalOpen ? "block" : "none" }}
        >
          <div className="p-3">
            <div className="flex justify-between">
              <span className=" text-xl text-slate-50">
                <ImFlattr />
              </span>
              <p
                className=" text-2xl text-slate-50 cursor-pointer font-bold "
                onClick={() => {
                  setModelOpen(false);
                }}
              >
                <AiOutlineClose />
              </p>
            </div>

            <div className="mt-3">
              <span className="flex items-center gap-2  text-slate-50">
                <MdTitle />
                <p className=" text-slate-50">Title: {expense[index].title}</p>
              </span>
              <span className="flex items-center gap-2  text-slate-50">
                <FaMoneyBill1 />
                <p className=" text-slate-50">
                  Amount: {expense[index].amount}
                </p>
              </span>
              <span className="flex items-center gap-2  text-slate-50">
                <TbCategory2 />
                <p className=" text-slate-50">
                  Categorie:{expense[index].categorie}
                </p>
              </span>
              <span className="flex items-center gap-2  text-slate-50">
                <CiStickyNote />
                <p className=" text-slate-50">
                  Description :{expense[index].note}
                </p>
              </span>
              <span className="flex items-center gap-2  text-slate-50">
                <BsCalendar2Date />

                <p className=" text-slate-50">
                  Date: {expense[index].createdAt.toString().split("GMT")[0]}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* =========== modal end+======= */}

      <div className=" expenses rounded-xl bg-slate-50 py-2 px-6 flex items-center justify-between cursor-pointer ">
        <div className=" expense-parent flex gap-2  items-center flex-1">
          <span>
            <p className="text-2xl" style={{ color: color }}>
              {" "}
              <VscActivateBreakpoints />
            </p>
          </span>
          <span
            className="  rounded-xl p-3 text-xl bg-orange-100 text-orange-500"
            onClick={modalHandler}
          >
            {/* <FaArrowTrendUp className="down-arrow" /> */}
            <FcBearish />
          </span>

          <span className="ms-3">
            <h4 className=" text-gray-900 font-bold">{title}</h4>
            <p className="expense-data">{displayDate}</p>
          </span>
        </div>
        <div className=" flex gap-4 ">
          <h4 className=" text-orange-500 font-bold">- ${amount}</h4>
          <span
            onClick={() => DeleteExpense(id)}
            className="text-2xl text-rose-800 cursor-pointer"
          >
            <FcFullTrash />
          </span>
        </div>
      </div>
    </div>
  );
}
