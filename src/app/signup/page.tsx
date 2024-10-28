"use client";
// import { SignUpUser } from "@/firebase/authentication"
import Link from "next/link";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firestore";

export default function SignUP() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [UserName, setUserName] = useState("");

  const [error, seterror] = useState<string | null>(null);
  const [message, setmessage] = useState<string | null>(null);
  const Router = useRouter();

  // here Authentication
  const auth = getAuth(app);

  async function SignUpUser(
    email: string,
    password: string,
    Confirmpassword: string,
    UserName: string
  ) {
    if (password !== Confirmpassword) {
      seterror("Please Enter Correct password");
      return;
    }

    seterror("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const { email, uid } = userCredential.user;
        // console.log("insie SignUp =>", email, uid);
        sendEmailVerification(userCredential.user);
        Router.push("/verify");
        saveUser({ email: email as string, UserName, uid });
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterror(errorMessage);
      });
    console.log(UserName, email);
  }

  const saveUser = async (user: {
    uid: string;
    UserName: string;
    email: string;
  }) => {
    try {
      const docRef = doc(db, "user", user.uid);
      await setDoc(docRef, user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="parent">
      <div className="parent ">
        <div className="heading signUp">
          <h1>Sign Up</h1>
        </div>
        {/* email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            id="signUp-email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </label>
        {/* username */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="UserName"
            id="UserName"
            placeholder=" UserName"
            value={UserName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        {/* password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            id="signUp-password"
            placeholder=" Enter password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </label>
        {/* confirm password */}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            id="ConfirmPassw"
            placeholder=" Confirm password"
            value={Confirmpassword}
            onChange={(e) => {
              setConfirmpassword(e.target.value);
            }}
          />
        </label>

        {/* error message */}
        <div className="error_meesage">
          {error && <p className="error text-red-600">{error}</p>}
          {message && (
            <p className="message text-green-500 ">
              {message}
              <span className="loading loading-spinner ms-1"></span>
            </p>
          )}
        </div>

        <div className=" mt-5">
          <button
            className="btn btn-wide"
            onClick={() => {
              SignUpUser(email, password, Confirmpassword, UserName);
            }}
          >
            Sign up
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        </div>
        <h4 className="mb-8 text-slate-900">
          Allready have an account ...?
          <Link className="text-blue-700" href={"/login"}>
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
}
