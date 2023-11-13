import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/nav/header";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-900">
      <Header />

      <div className="flex absolute bottom-0 bg-white w-10 h-5"></div>
    </div>
  );
}

export default App;
