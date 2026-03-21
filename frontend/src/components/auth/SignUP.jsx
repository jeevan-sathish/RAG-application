import React, { useState } from "react";
import { FaGetPocket } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const SignUP = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    gender: "",
    status: "",
    email: "",
    password: "",
  });

  const [res, setRes] = useState("");
  // const [isSignUP,setIsSignUp]=useState(false)

  function handleInputs(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (Object.values(data).some((field) => field === "")) {
      alert("Fields cannot be empty");
      return;
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        setRes(result.message);
        if (result.message == "Field error") {
          navigate("/SignUP");
          alert("field cannot be empty");
        } else if (result.message == "user exist") {
          navigate("/SignIN");
        } else {
          navigate("/SignIN");
        }
        if (result.message == "signup success") {
          setData({
            name: "",
            email: "",
            password: "",
            gender: "",
            status: "",
          });
        } else {
          alert(result.message || "Signup failed");
        }
      } catch (e) {
        console.log("error:", e);
      }
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="text-white shadow-2xl shadow-amber-200 w-[340px] h-[500px] p-4 bg-black rounded-2xl flex flex-col justify-evenly items-center">
        <div className="w-full flex flex-row justify-center items-center font-extrabold gap-2">
          <h1 className="text-[35px] text-green-400">Register here </h1>
          <FaGetPocket className="text-[35px] text-green-400" />
        </div>
        <input
          placeholder="Enter your name"
          name="name"
          value={data.name}
          className="border bg-gray-300 text-black border-white w-[80%] h-[40px] rounded-2xl p-[20px]"
          type="text"
          onChange={handleInputs}
        />
        <select
          className="border bg-gray-300 text-black border-white w-[80%] h-[40px] rounded-2xl p-[20px]"
          name="gender"
          value={data.gender}
          onChange={handleInputs}
        >
          <option value="">Selct Gender</option>

          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="not to say">Not to Say</option>
        </select>
        <select
          className="border bg-gray-300 text-black border-white w-[80%] h-[40px] rounded-2xl p-[20px]"
          name="status"
          value={data.status}
          onChange={handleInputs}
        >
          <option value="">Selct Status</option>

          <option value="student">Student</option>
          <option value="working">working</option>
        </select>

        <input
          placeholder="Enter the email"
          className="border bg-gray-300 text-black border-white w-[80%] h-[40px] rounded-2xl p-[20px]"
          type="email"
          name="email"
          value={data.email}
          onChange={handleInputs}
        />
        <input
          placeholder="Enter the password"
          className="border bg-gray-300 text-black border-white w-[80%] h-[40px] rounded-2xl p-[20px]"
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputs}
        />
        <div className="w-[80%] flex flex-row gap-2 justify-center items-center">
          <button
            className="w-full h-[40px] bg-green-400 text-black font-medium rounded-2xl text-[20px]"
            onClick={handleSubmit}
          >
            submit{" "}
          </button>

          <FaArrowUpRightFromSquare
            className="text-[30px]"
            onClick={handleSubmit}
          />
        </div>
        <h1 className="text-white">{res}</h1>

        <p className="text-blue-300 animate-pulse text-[15px]">
          Already have an account!{" "}
          <Link
            to="/SignIN"
            className="text-red-300 underline hover:text-green-400"
          >
            click
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUP;
