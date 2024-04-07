import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-screen grid grid-cmg-program bg-gray-800 font-medium overflow-hidden box-border">
      <Header />
      <div className="flex flex-row row-start-2 row-end-7">
        <Router>
          <Aside></Aside>
          <Main></Main>
        </Router>
      </div>
    </div>
  );
}

export default App;
