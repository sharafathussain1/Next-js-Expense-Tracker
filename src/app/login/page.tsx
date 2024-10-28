"use client";
import { app } from "@/firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState<string | null>(null);
  const [message, setmessage] = useState<string | null>(null);
  const Router = useRouter();

  //   login Authentication
  const auth = getAuth(app);

  function SigInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        if (userCredential.user.emailVerified === true) {
          seterror("");
          // const { email, uid } = userCredential.user;

          // console.log(
          //   email,
          //   uid,
          //   "user LOGGED IN successfully.",
          //   userCredential
          // );
          setmessage("Sign in succesfully");
          setemail("");
          setpassword("");
          Router.push("/home");
        } else {
          Router.push("/verify");
        }
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterror(errorMessage);
      });
  }

  return (
    <div id="parent">
      <div className="parent ">
        <div className="heading">
          <h1>Login</h1>
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
            id="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </label>
        {/* paswword */}
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
            id="login-password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
          />
        </label>

        {/* forgett password */}

        <span className="forgetPassw">
          <Link href={"/forgotpasskey"}>Forgot password?</Link>
        </span>
        {/* error section */}

        <div className="error_meesage">
          {error && <p className="error text-red-600 ">{error} </p>}
          {message && (
            <p className="message text-green-500 flex items-center justify-center">
              {message} <span className="loading loading-spinner ms-1"></span>
            </p>
          )}
        </div>

        <div className=" mt-5">
          <button
            type="submit"
            className="btn btn-wide"
            onClick={() => SigInUser(email, password)}
          >
            Sign In
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        </div>

        <h4 className="text-slate-900">
          Don't have an account ...?
          <Link className="text-blue-700" href={"/signup"}>
            Sign up
          </Link>
        </h4>
      </div>
    </div>
  );
}
