import React, { useState } from "react";
import { setIsLogin } from "../../Redux/Slice/PokemonSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BACKEND_END_POINT, requestOptions } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "material-react-toastify";
import "./Login.css";

export default function Login() {
    const dispatch = useDispatch();
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "identifier") {
            setUserNameOrEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function resetForm() {
        setUserNameOrEmail("");
        setPassword("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const isEmail = userNameOrEmail.includes("@");
            const conditionBasedData = isEmail
                ? { email: userNameOrEmail }
                : { userName: userNameOrEmail };
            const userObj = {
                ...conditionBasedData,
                password,
            };
            // console.log(userObj);

            const response = await axios.post(
                `${BACKEND_END_POINT}/login`,
                userObj,
                requestOptions
            );

            if (response?.data?.success) {
                resetForm();
                toast.success(response?.data?.message);
                dispatch(setIsLogin(true));
            }
        } catch (err) {
            console.warn("Error while login: " + err);
            setError("ERROR: " + err?.message);
            toast.error(err?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="w-full min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="login-form relative w-full max-w-md flex flex-col justify-start items-center gap-4 border rounded-3xl bg-white shadow-2xl py-5"
            >
                <h1 className="text-xl text-slate-500 font-medium text-center mb-5 mt-5">
                    Login Form
                </h1>
                <input
                    type="text"
                    value={userNameOrEmail}
                    name="identifier"
                    onChange={handleChange}
                    placeholder="Email or Username"
                    className="w-[80%] h-[45px] rounded-md border px-5 outline-none focus:ring-[2.5px] focus:border-blue-200 focus:border-none  hover:border-blue-200 transition-all ease-out"
                />
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-[80%] h-[45px] rounded-md border px-5 outline-none focus:ring-[2.5px] focus:border-blue-200 focus:border-none transition-all 1s ease-out hover:border-blue-200"
                />
                <button
                    type="submit"
                    className={`relative w-[80%] h-[45px] flex justify-center items-center max-w-sm py-2 px-4 text-white text-sm font-medium bg-blue-500 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 mt-1
                         ${loading
                            ? "opacity-75 cursor-not-allowed"
                            : "hover:bg-blue-600 active:bg-blue-700"
                        }`}
                    disabled={loading}
                >
                    <span className="text-[17px] font-medium">Login</span>
                    {loading && (
                        <span className="absolute top-4 right-[90px] flex items-center justify-center">
                            <PulseLoader size={8} color={"#ffffff"} />
                        </span>
                    )}
                </button>
                <div className="mt-2 mb-4">
                    <span>Haven't an account?</span>
                    <span
                        onClick={() => navigate("/register")}
                        className="hover:text-blue-500 cursor-pointer ml-2 hover:border-b-2 border-red-500"
                    >
                        Register
                    </span>
                </div>
                {error && (
                    <div className="absolute bottom-14 text-sm text-red-500 text-center">
                        {error}
                    </div>
                )}
            </form>
        </section>
    );
}
