import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-200 font-medium overflow-hidden box-border">
      <Header />
      <div className="flex flex-row h-5/6 w-full max-w-full box-border flex-1">
        <Router>
          <Aside></Aside>
          <Main></Main>
        </Router>
      </div>
    </div>
  );
}

export default App;
