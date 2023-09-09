import React from "react";
import "./CodeBlock";
import CodeBlock from "../components/CodeBlock";

function CodeBlocksList({ socket, codeBlocksListProps }) {
  return (
    <>
      <h1>Choose a code block</h1>
      <ul className="list-group">
        {codeBlocksListProps.map((codeBlock, index) => (
          <div>
            <CodeBlock socket={socket} key={index} codeBlockProps={codeBlock} />
          </div>
        ))}
      </ul>
    </>
  );
}

export default CodeBlocksList;
