"use client";
import { ImStatsBars } from "react-icons/im";
import { app } from "@/firebase/config";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  name: string; // Specify the type of 'name' as a string
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  function logout() {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);

        // An error happened.
      });
  }

  return (
    <div className="main">
      <div className="header-parent bg-slate-700 rounded-xl flex justify-between w-5/6">
        <div className="header-first p-5">
          <div className="flex items-center">
            <div className="image">
              <Image src="/avator.webp" alt="" width={100} height={100} />
            </div>
            <p className="ps-4  text-gray-400 font-bold font-sans">{name}</p>
          </div>
        </div>

        <div className="header-second p-5 ">
          <div className="flex items-center gap-5 ">
            <Link
              href="/stats"
              className="text-xl cursor-pointer text-slate-900"
            >
              {" "}
              <ImStatsBars />
            </Link>

            <div>
              <button
                onClick={logout}
                className=" logout-btn border-2  border-slate-900 rounded-md py-2 px-5 font-bold cursor-pointer text-gray-400 bg-slate-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
