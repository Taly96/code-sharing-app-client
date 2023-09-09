import React from "react";
import { useNavigate } from "react-router-dom";
import CodeHighlighter from "../components/CodeHighlighter";

function CodeBlock({ socket, codeBlockProps }) {
  let navigate = useNavigate();

  return (
    <div>
      <li
        className="list-item"
        key={codeBlockProps._id}
        onClick={() => {
          socket.emit("join-room", codeBlockProps._id);
          navigate(`/${codeBlockProps._id}`);
        }}
      >
        <h2>{codeBlockProps.title}</h2>
        <pre>
          <CodeHighlighter code={codeBlockProps.code} language="javascript" />
        </pre>
      </li>
    </div>
  );
}

export default CodeBlock;
