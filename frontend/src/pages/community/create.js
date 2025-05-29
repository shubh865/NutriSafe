import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const handleCreatePost = () => {
    setLoading(true);
    // Define the request body
    const requestBody = {
      username: "Jhenil Parihar",
      text: document.getElementById("postText").value,
      image: null,
    };

    // Define the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      redirect: "normal",
    };

    // Send the POST request to the API endpoint
    fetch("https://nutrisafe.onrender.com/message", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error))
      .finally(() => setLoading);
  };

  return (
    <div className="flex h-[500px] w-[100%] p-[20px] justify-center items-center">
      <div className="mx-auto p-[20px] w-[100%] rounded-[20px] border-[1px] border-gray-300 shadow-lg">
        <div className="flex py-[10px] mb-[10px] items-center border-y-[1px] border-gray-300 gap-x-[10px]">
          <img
            className="h-[40px]"
            src="/assets/profile.png"
            alt="Profile"
          ></img>
          <p className="font-bold text-xl">Jhenil Parihar</p>
        </div>
        <textarea
          id="postText"
          className="w-full h-[200px] p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter your post here..."
        ></textarea>
        <br />
        <br />
        <button
          className="w-[100px] h-[50px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCreatePost} // Call handleCreatePost function on button click
        >
          {loading ? (
            <ClipLoader color="white" />
          ) : (
            <span className="text-xl">Create</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Create;
