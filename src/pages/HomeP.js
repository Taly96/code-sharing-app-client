import "../components/CodeBlocksList";
import axios from "axios";
import { useEffect, useState } from "react";
import CodeBlocksList from "../components/CodeBlocksList";
const serverUrl = "https://code-sharing-app-api-827df04e0f24.herokuapp.com/";

function HomeP({ socket }) {
  const [listOfCodeBlocks, setListOfCodeBlocks] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl)
      .then((response) => {
        setListOfCodeBlocks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="Home">
      <div>
        <CodeBlocksList
          socket={socket}
          codeBlocksListProps={listOfCodeBlocks}
        />
      </div>
    </div>
  );
}

export default HomeP;
