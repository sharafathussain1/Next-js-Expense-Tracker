"use client";
import { app } from "@/firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setemail] = useState("");
  const Router = useRouter();
  const auth = getAuth(app);

  function reset(email: string) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "Reset password link send your gmail. click the link and save a new password."
        );
        Router.push("/login");
      })
      .catch((error) => {
        console.log(error);

        // ..
      });
  }
  return (
    <div id="parent" className=" bg-slate-50">
      <div
        id="forgot-section"
        className="flex items-center justify-center gap-10"
      >
        <h1 className="heading forgot text-center">Forgot Password</h1>
        <div>
          <Image
            src="/forggot-img.png"
            alt=""
            width={400}
            height={250}
            className="border rounded-xl"
          />
        </div>
        <div className="parent forgot-parent border rounded-xl">
          <p className="text-center text-slate-800">
            Check your Mail box after enter your email address{" "}
          </p>
          <label className="input input-bordered flex items-center gap-2 bg-slate-900">
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
              className="text-slate-50"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </label>
          <button
            className="btn w-[100px] text-slate-50 bg-slate-900"
            onClick={() => {
              reset(email);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
