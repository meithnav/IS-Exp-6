import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoginFormPage from "./components/LoginFormPage";
import SignupScreen from "./components/SignupScreen";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="App">
      {page === "login" && <LoginFormPage setPage={setPage} />}
      {page === "signup" && <SignupScreen setPage={setPage} />}
    </div>
  );
}

export default App;
