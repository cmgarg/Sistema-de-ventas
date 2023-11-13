import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/aside/Aside";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <Header />
      <Aside></Aside>
    </div>
  );
}

export default App;
