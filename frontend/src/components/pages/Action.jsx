import React, { useState } from "react";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FaFileAlt } from "react-icons/fa";
import "../../App.css";

const heroText =
  "Upload your resume for AI-powered analysis, or ask any question using our RAG agent.";

const Action = () => {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState("");
  const [purpose, setPurpose] = useState("retrive");
  const [chunk, setChunk] = useState([]);
  const [fileName, setFilename] = useState("");
  const [prompt, setprompt] = useState("");
  const [answer, setAnswer] = useState("");

  function handleFile(e) {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFilename(selectedFile.name);
    const formData = new FormData();
    formData.append("file", selectedFile);
    setFile(formData);
  }

  async function handleSubmit() {
    try {
      if (!file) {
        setRes("Please upload a file first");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/files", {
        method: "POST",
        body: file,
      });

      const result = await response.json();
      setRes(result.text);
      setChunk(result.chunks);
    } catch (err) {
      console.log("error:", err);
    }
  }

  function handlePrompt(e) {
    setprompt(e.target.value);
  }

  async function handlePromptSubmit() {
    try {
      const response = await fetch("http://127.0.0.1:5000/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const output = await response.json();
      setAnswer(output.answer);
    } catch (err) {
      console.log("err:", err);
    }
  }
  return (
    <div className="w-full h-[92vh] flex flex-row gap-2.5 bg-gray-900 justify-center items-center ">
      <div className="user-field w-[40%] h-[80vh] flex flex-col justify-center gap-5 items-center bg-transparent rounded-[10px]  text-white">
        <nav className="w-full h-12.5 rounded-[10px] bg-gray-800 flex justify-center items-center">
          <div className="flex flex-row gap-2.5 text-amber-700 justify-center items-center">
            <FaMagnifyingGlassChart className="text-[25px] text-amber-00" />
            <p>
              Lets Analyse Your piece of work:{" "}
              <span className="text-green-700">"Resume"</span>{" "}
            </p>
          </div>
        </nav>

        <main className="w-full h-[70vh] bg-black rounded-2xl flex flex-col gap-3 justify-center p-5">
          <p className="text-gray-600 text-center">{heroText}</p>
          <div className="w-full h-auto flex justify-center items-center">
            <input
              type="file"
              id="resumeUpload"
              className="hidden"
              onChange={handleFile}
            />

            <label
              htmlFor="resumeUpload"
              className="flex items-center gap-2 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-200 hover:bg-gray-100 hover:shadow-md"
            >
              <FiUpload className="text-lg" />
              Upload Resume
            </label>

            <button
              className="w-[80px] h-[30px] bg-green-800 rounded-r-2xl hover:scale-80"
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
        </main>
      </div>

      {/* right container */}
      <div className="w-[55%] h-[87vh] p-5 rounded-[10px]  bg-black border border-l-gray-700">
        <nav className="w-full h-[30px] text-white border-b border-gray-600 flex gap-8 justify-center items-center">
          <button id="btn" onClick={() => setPurpose("retrive")}>
            Retrive
          </button>
          <button id="btn" onClick={() => setPurpose("chunks")}>
            chunks
          </button>
          <button id="btn" onClick={() => setPurpose("chat")}>
            chat
          </button>
          <button id="btn" onClick={() => setPurpose("result")}>
            result
          </button>
          <div className="flex flex-row justify-center items-center gap-3">
            <p className="text-white">./{fileName}</p>
            <FaFileAlt />
          </div>
        </nav>

        <main className="w-full h-full  text-white flex justify-center items-center">
          {purpose == "retrive" ? (
            <div className="w-[100%] p-[10px] text-[12px] h-[85%] overflow-y-scroll">
              <SyntaxHighlighter
                language="text"
                showLineNumbers
                customStyle={{
                  background: "transparent",
                  padding: "0",
                  margin: "0",
                  color: "white",
                }}
                lineNumberStyle={{
                  minWidth: "2.5rem",
                  color: "red",
                  background: "transparent",
                  paddingRight: "12px",
                }}
                codeTagProps={{
                  style: {
                    color: "gray",
                  },
                }}
              >
                {res}
              </SyntaxHighlighter>
            </div>
          ) : purpose == "chunks" ? (
            <div className="w-full p-2.5 h-[85%] overflow-y-scroll flex flex-col gap-5 ">
              {chunk.map((ele, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-[10px] text-[14px] rounded-2xl  bg-gray-900"
                >
                  <p className="text-amber-600">
                    <span>chunk:</span>
                    {ele.chunk_no},
                  </p>
                  <p className="text-gray-600">{ele.chunk_text}</p>
                </div>
              ))}
            </div>
          ) : purpose == "chat" ? (
            <div className="w-full p-2.5 h-[85%] overflow-y-scroll text-black bg-white flex flex-col gap-5 ">
              <input
                type="text"
                placeholder="handlePrompt"
                name="prompt"
                value={prompt}
                onChange={handlePrompt}
              />
              <button onClick={handlePromptSubmit}>submit</button>
              <p>{answer}</p>
            </div>
          ) : (
            <div className="w-full p-2.5 h-[85%] overflow-y-scroll text-black bg-white flex flex-col gap-5 ">
              result
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Action;
