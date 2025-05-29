import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Community = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nutrisafe.onrender.com/message"
        );
        const data = await response.json();
        setPosts(data.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []); // Empty dependency array to ensure useEffect runs only once on mount

  return (
    <div>
      <div className="flex w-full py-[5px] bg-white shadow-xl px-[20px] top-0 left-0 fixed justify-between items-center">
        <p className="text-2xl font-bold">All Posts</p>
        <button
          className="text-gray-700 border-gray-300 rounded-full flex justify-center items-center h-[50px] w-[50px]"
          onClick={() => router.push("/community/create")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-[40px] h-[40px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      {/* Render posts from state */}
      {posts.map((post) => (
        <div
          key={post._id.$oid}
          className="p-[10px] mb-[10px] border-b-[2px] shadow-lg border-gray-200"
        >
          <div className="flex py-[10px] items-center border-y-[1px] border-gray-300 gap-x-[10px]">
            <img className="h-[40px]" src="assets/user.png" alt="Profile" />
            <p className="font-bold text-xl">{post.username}</p>
          </div>
          <p className="min-h-[100px]">{post.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Community;
