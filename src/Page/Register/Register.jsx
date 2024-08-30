import React, { useState } from "react";
import { BACKEND_END_POINT, requestOptions } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { toast } from 'material-react-toastify';

export default function Register() {
  const [userObj, setUserObj] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setUserObj((prevData) => ({ ...prevData, [name]: value }));
  }

  function resetForm() {
    setUserObj({
      userName: "",
      email: "",
      password: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_END_POINT}/register`,
        userObj,
        requestOptions
      );
      // console.log(response);
      if (response?.data?.success) {
        navigate("/");
        resetForm();
        toast.success(response?.data?.message)
      }
    } catch (err) {
      console.warn("ThugBoss-ERROR while registering: " + err);
      setError("ERROR " + err?.message);
      toast.error(err.response?.data?.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="w-full min-h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="relative w-[95%] h-auto max-w-md flex flex-col justify-start items-center gap-4 border rounded-xl bg-white shadow-2xl py-5"
        >
          <h1 className="text-2xl text-slate-500 font-medium text-center mb-5 mt-1">
            Registration Form
          </h1>
          <input
            type="text"
            value={userObj.userName}
            name="userName"
            onChange={handleChange}
            placeholder="Username"
            className="w-[80%] h-[45px] rounded-md border px-5 outline-none focus:ring-[3px] focus:border-blue-600 focus:border-none transition-all 1s hover:border-blue-500"
          />
          <input
            type="email"
            value={userObj.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-[80%] h-[45px] rounded-md border px-5 outline-none focus:ring-[3px] focus:border-blue-600 focus:border-none transition-all 1s hover:border-blue-500"
          />
          <input
            type="password"
            value={userObj.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-[80%] h-[45px] rounded-md border px-5 outline-none focus:ring-[3px] focus:border-blue-600 focus:border-none transition-all 1s hover:border-blue-500"
          />
          <button
            type="submit"
            className={`relative w-[80%] h-[45px] flex justify-center items-center max-w-sm py-2 px-4  text-white text-sm font-medium  bg-blue-500 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mt-1
              ${loading
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-blue-600 active:bg-blue-700"
              }
 `}
            disabled={loading}
          >
            <span className="text-[17px] font-medium">Sign up</span>{" "}
            {loading ? (
              <span className="absolute top-4 right-20">
                <PulseLoader size={8} color={"#ffffff"} />
              </span>
            ) : (
              ""
            )}
          </button>
          <div className="mt-2 mb-4">
            <span>Already have an account?</span>
            <span
              onClick={() => navigate("/")}
              className="hover:text-blue-500 cursor-pointer ml-2 hover:border-b-2 border-red-500"
            >
              Login
            </span>
          </div>
          {error && (
            <div className="absolute bottom-2 text-md text-red-500 text-center">{error}</div>
          )}
        </form>
      </section>
    </>
  );
}
