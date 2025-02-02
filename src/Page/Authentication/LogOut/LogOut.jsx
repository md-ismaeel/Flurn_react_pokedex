import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_API_ENDPOINTS, requestOptions } from "../../../Utils/utils";
import { setIsLogin } from "../../../Redux/Slice/PokemonSlice";
import { Loader } from "../../../Components/Loader";
import { cssClass } from "../../../Components/cssModule";

export default function LogOut() {
    const { isLogin } = useSelector((state) => state?.pokeDex);
    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogout() {
        setLogout(true);
        try {
            const response = await axios.get(
                `${BACKEND_API_ENDPOINTS}/logout`,
                requestOptions
            );
            if (response?.data?.success) {
                dispatch(setIsLogin(false));
                toast.success(response?.data?.message);
                Cookies.remove("token");
                navigate("/");
            }
        } catch (err) {
            console.warn("ERROR =>", err);
            toast.error(err?.response?.data?.message || "An error occurred.");
        } finally {
            setLogout(false);
        }
    }

    return (
        <>
            <button
                onClick={handleLogout}
                className={`w-[130px] h-[45px] absolute top-4 right-10 rounded-full border bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium capitalized hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500`}
            >
                {logout ? (
                    <div className="relative w-full h-full flex justify-end items-center">
                        <span className="absolute left-[-4rem] top-[2.7rem] w-[50%]">
                            <Loader />
                        </span>
                        <span className="mr-2">Loading...</span>
                    </div>
                ) : (
                    "Logout"
                )}
            </button>
        </>
    );
};
