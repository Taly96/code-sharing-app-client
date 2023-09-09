import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const serverUrl = "https://code-sharing-app-api-827df04e0f24.herokuapp.com";

function CodeBlockP({ userType, socket }) {
  let { id } = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("use ffect 1");
    return () => {
      socket.emit("leave-room", id);
      console.log("left room ", id);
    };
  }, [id, socket]);

  useEffect(() => {
    console.log("use ffect 2");
    axios.get(`${serverUrl}/byId/${id}`).then((response) => {
      setCodeBlock(response.data);
    });
  }, [id]);

  useEffect(() => {
    console.log("use ffect 3");
    setText(codeBlock.code);
  }, [codeBlock.code]);

  useEffect(() => {
    console.log("use ffect 4");

    socket.on("code-changed", (updatedText) => {
      setText(updatedText);
    });

    socket.on("error", (error) => {
      console.error("Socket.io Error:", error);
    });
  }, [socket]);

  const handleTextChange = async (e) => {
    const newText = e.target.value;
    setText(newText);
    console.log("text changed");
    const textData = {
      room: id,
      text: newText,
    };
    // Send the updated text to the server
    await socket.emit("code-change", textData);
  };

  const handleSubmit = () => {
    const requestBody = {
      id: id,
      title: codeBlock.title,
      code: text,
    };
    axios
      .post(`${serverUrl}/byId/${id}`, requestBody)
      .then((response) => {
        // Handle the successful response here
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  return (
    <div className="codeBlocksPage">
      <div className="codeBlockContainer">
        <h2>{codeBlock.title}</h2>
        <pre className="codeBlock">
          <textarea
            className="text-area"
            value={text}
            onChange={handleTextChange}
            readOnly={userType === 1}
            cols={40}
            rows={20}
          />
        </pre>
        {userType !== 1 && (
          <button className="submit" onClick={handleSubmit}>
            Submit Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default CodeBlockP;
