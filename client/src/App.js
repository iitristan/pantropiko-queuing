import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Queue from "./pages/Queue";
import Admin from "./pages/Admin";
import { Routes, Navigate, Route } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function App() {
  const [queue, setQueue] = useState({ preparing: [], serving: [] });

  useEffect(() => {
    socket.on("update_queue", (data) => {
      setQueue(data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/Queue" element={<Queue />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
