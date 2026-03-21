import React, { useState } from "react";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const heroText =
  "Upload your resume for AI-powered analysis, or ask any question using our RAG agent.";

const Action = () => {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState("");

  function handleFile(e) {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

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
    } catch (err) {
      console.log("error:", err);
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
      <div className="w-[50%] h-[80vh] p-5 rounded-[10px] overflow-y-scroll bg-black border border-l-gray-700">
        <nav className="w-full h-[30px] border-b border-gray-600"></nav>
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
    </div>
  );
};

export default Action;
