import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    // display: "block",
    // margin: "0 auto",
    // borderColor: "red",

};

const Loading = ({ color = "#00BFFF", loading = true }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[200] bg-gray-200 bg-opacity-90">
            <div className="flex flex-col items-center">
                <ClipLoader
                    color={color}
                    cssOverride={override}
                    loading={loading}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <h3 className="mt-4 text-2xl font-medium text-teal-700 italic">Loading...</h3>
            </div>
        </div>
    );
};

export default Loading;