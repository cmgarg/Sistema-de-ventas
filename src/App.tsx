import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/nav/header";

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
      <div>Total Memory: {memoryInfo.totalMemory}</div>
      <div>Free Memory: {memoryInfo.freeMemory}</div>
      <div className="flex absolute bottom-0 bg-white w-10 h-5">
        <p>Gonzalo123</p>
      </div>
    </div>
  );
}

export default App;
