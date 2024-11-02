"use client";

import Image from "next/image";

export default function Varify() {
  return (
    <div className="verify-parent">
      <div className="verify-child">
        <div className="img">
          <Image
            src={"/ok-1976099_1280.webp"}
            alt=""
            width={100}
            height={100}
          ></Image>
        </div>
        <div className="succes_message">
          <h1 className="text-slate-50">Email Sent Successfully!</h1>
          <p>
            Please check your email inbox then click the link to verify your
            email and <b>Hit the refresh button</b>
          </p>
          <p>Thank You!</p>
        </div>
        <div className="verify-btn flex gap-5 mt-5">
          {/* <button onClick={resent}>resent</button> */}
          <button
            className="auth-btn"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
