import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/nav/header";
import Aside from "./components/nav/Aside";

function App() {
  const [memoryInfo, setMemoryInfo] = useState({
    totalMemory: 0,
    freeMemory: 0,
  });

  useEffect(() => {
    window.electronAPI.getSystemMemory();

    const systemMemoryListener = (event, data) => {
      setMemoryInfo(data);
    };

    window.electronAPI.onSystemMemory(systemMemoryListener);

    // Realiza la limpieza al desmontar
    return () => {
      window.electronAPI.removeSystemMemoryListener();
    };
  }, []);
  return (
    <div className="w-screen h-screen bg-gray-900">
      <Header />
      <Aside />
    </div>
  );
}

export default App;
