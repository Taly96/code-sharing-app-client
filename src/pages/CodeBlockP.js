import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const serverUrl = "https://code-sharing-app-api-827df04e0f24.herokuapp.com/";
function CodeBlockP({ userType, socket }) {
  let { id } = useParams();
  const [codeBlock, setCodeBlock] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    return () => {
      socket.emit("leave-room", id);
    };
  }, [id, socket]);

  useEffect(() => {
    axios.get(`${serverUrl}/byId/${id}`).then((response) => {
      setCodeBlock(response.data);
    });
  }, [id]);

  useEffect(() => {
    setText(codeBlock.code);
  }, [codeBlock.code]);

  useEffect(() => {
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
    const textData = {
      room: id,
      text: newText,
    };

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
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="codeBlocksPage">
      <div className="codeBlock">
        <h2>{codeBlock.title}</h2>
        <pre>
          <textarea
            value={text}
            onChange={handleTextChange}
            readOnly={userType === 1}
            cols={40}
            rows={20}
          />
        </pre>
        {userType !== 1 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}

export default CodeBlockP;
