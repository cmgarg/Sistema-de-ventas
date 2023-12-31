import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 font-medium">
      <Header />
      <div className="flex flex-row flex-1">
        <Router>
          <Aside></Aside>
          <Main></Main>
        </Router>
      </div>
    </div>
  );
}

export default App;
