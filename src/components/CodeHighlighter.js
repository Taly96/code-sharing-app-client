import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";

const CodeHighlighter = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    // Highlight code when the component mounts
    hljs.highlightBlock(codeRef.current);
  }, [code, language]);

  return (
    <pre>
      <code ref={codeRef} className={language}>
        {code}
      </code>
    </pre>
  );
};

export default CodeHighlighter;
