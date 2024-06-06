import React, { useState } from "react";
import "./join.scss";
import SignUp from "./signup/SignUp";
import SignIn from "./SignIn/SignIn";

const Join = () => {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="joinus-container">
      <header className="header-switch">
        <button
          className={`sign-btn ${activeTab === "signin" ? "active" : ""}`}
          onClick={() => setActiveTab("signin")}
        >
          Signin
        </button>
        <button
          className={`sign-btn ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => setActiveTab("signup")}
        >
          SignUp
        </button>
      </header>

      <main className="join-inputField-container">
        {activeTab === "signup" ? <SignUp />: <SignIn />}
      </main>
    </div>
  );
};

export default Join;

{
  /* <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
        style={{ height: "300px", width: "300px" }}
      >
        <Controls
          visible={true}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player> */
}
