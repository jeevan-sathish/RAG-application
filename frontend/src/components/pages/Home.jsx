import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import { LuMoveRight } from "react-icons/lu";

const Home = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState([]);
  const [chunkSize, setChunkSize] = useState(0);
  const [vectorLen, setVectorLen] = useState(0);
  const [eachVectorlen, setEachVectorLen] = useState(0);
  const navigate = useNavigate();

  const ragExplanation = `
  RAG stands for Retrieval-Augmented Generation.
It is a technique used in AI to improve response accuracy.
RAG combines information retrieval with text generation.
Instead of relying only on a trained model, it fetches external data.
This makes answers more up-to-date and context-aware.
First, the user gives a query or question.
Then, the system searches a knowledge base or documents.
Relevant chunks of data are retrieved.
These chunks are usually stored in a vector database.
Embeddings are used to find similar content.
The retrieved data is passed along with the query.
A language model then processes both inputs together.
This helps generate more accurate and meaningful responses.
RAG reduces hallucinations in AI models.
It is widely used in chatbots and question-answering systems.
Common tools include LangChain and vector databases like Chroma.
It works well with PDFs, documents, and custom datasets.
RAG is useful in real-time and domain-specific applications.
It improves reliability without retraining the model.
Overall, RAG makes AI smarter by using external knowledge......
`;

  function handleText(e) {
    setText(e.target.value);
  }

  async function handleSubmit() {
    if (text) {
      try {
        const response = await fetch("http://127.0.0.1:5000/result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: text }),
        });

        const result = await response.json();
        setOutput(result.result);
        setChunkSize(result.chunkSize);
        setVectorLen(result.vecLen);
        setEachVectorLen(result.eachVecLen);
        console.log(result.result);
        setText(" ");
      } catch (err) {
        console.log("error:", err);
      }
    } else {
      navigate("/");
    }
  }

  function handleClear() {
    setOutput([]);
  }

  function handleContinue() {
    navigate("/SignIN");
  }
  return (
    <div className="w-full h-[90vh] bg-gray-900 flex flex-row gap-2  ">
      <div className="contentPage w-[40%] h-[85vh] shadow-2xl shadow-blue-900 rounded-2xl m-[20px] border border-gray-800 bg-black p-[30px]">
        <div className="w-full h-[70px] flex flex-row justify-center items-center">
          <p className="text-[22px] text-amber-300">
            {" "}
            <span className="text-[35px] font-extrabold">RAG</span>(Retrieval
            Augmented Generation)
          </p>
        </div>
        <p
          className="text-gray-600 text-[14px] hover:animate-pulse"
          style={{ fontFamily: "Fira Code, monospace" }}
        >
          {ragExplanation}
        </p>
      </div>

      <div className="w-[55%] h-[85vh] bg-tranparent m-[20px] flex flex-col gap-[30px] justify-center items-center p-[40px]">
        <p className="text-[50px] text-center text-white leading-13.5">
          Wellcome,Try The new <span className="text-blue-500">RAG</span> Tech
        </p>
        <div className="w-[80%] min-h-[200px] p-[20px] rounded-2xl bg-gray-800 border border-black flex flex-col">
          <p className="text-amber-600">let's try processing.....</p>
          <div className="w-full flex flex-row gap-4 mt-[10px]">
            <input
              type="text"
              value={text}
              onChange={handleText}
              className="w-[300px] h-[30px] pl-[30px] text-green-400  rounded-[5px] border border-black"
              placeholder="ask about Rag?"
            />
            <button
              onClick={handleSubmit}
              className="text-red-600 font-extrabold animate-pulse hover:scale-120"
            >
              fetch()
            </button>
            <button onClick={handleClear} className="text-teal-300">
              clear()
            </button>
          </div>

          {output.length > 0 ? (
            <div className="w-[80%] h-auto p-[10px]">
              <p className="text-gray-400">{output[0]}</p>
            </div>
          ) : (
            <div className="w-full flex flex-row justify-center items-center">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
        </div>

        <div className="w-[85%] h-[50px] flex flex-row justify-center  gap-[15px] items-center shrink-0 p-[10px] bg-black rounded-[5px] text-white">
          <FaInfoCircle className="text-[20px] text-amber-700" />
          <h1>
            chunk_size : <span className="text-red-500">{chunkSize}</span>
          </h1>
          <h1>
            vector_Len : <span className="text-red-500">{vectorLen}</span>
          </h1>
          <h1>
            vector_len[0]: <span className="text-red-500">{eachVectorlen}</span>
          </h1>
        </div>

        <button
          onClick={handleContinue}
          className="w-[200px] h-[40px] flex flex-row text-center justify-center items-center text-white gap-2.5 rounded-[10px] bg-blue-500 hover:scale-110"
        >
          <LuMoveRight />
          Continue
        </button>
      </div>
    </div>
  );
};

export default Home;
