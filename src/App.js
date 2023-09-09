import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomeP from "./pages/HomeP";
import CodeBlockP from "./pages/CodeBlockP";
import io from "socket.io-client";
import "./App.css";
const socketUrl =
  "https://https://code-sharing-app-api-827df04e0f24.herokuapp.com/";
const socket = io.connect(socketUrl);

function App() {
  const [userType, setUserType] = useState(-1);

  useEffect(() => {
    socket.on("connected", () => {
      console.log("Connected to the server via Socket.io");
    });

    socket.on("user-type", (data) => {
      setUserType(data);
    });

    socket.on("error", (error) => {
      console.error("Socket.io Error:", error);
    });
  }, [userType]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeP socket={socket} />} />
          <Route
            path="/:id"
            element={<CodeBlockP userType={userType} socket={socket} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
