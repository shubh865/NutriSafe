import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const Recipies = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full">
        <img className="" src="assets/header.png"></img>
      </div>
      <div className="px-[10px]">
        <h1 className="font-bold text-3xl mb-[20px]">Select Category</h1>
        <div className="flex flex-col gap-y-[20px]">
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ffefcb] overflow-hidden"
            onClick={() => router.push("/recipes/breakfast")}
          >
            <div className="py-[10px]">
              <p className="font-bold text-xl">Breakfast</p>
              <p className="text-gray-600">
                Breakfast energizes the day, fostering health and productivity.
              </p>
            </div>
            <img
              className="h-[100%] mr-[-20px]"
              src="assets/breakfast.png"
            ></img>
          </div>
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ceedff] overflow-hidden"
            onClick={() => router.push("/recipes/lunch")}
          >
            <div className="py-[10px] pr-[10px]">
              <p className="font-bold text-xl">Lunch</p>
              <p className="text-gray-600">
                Lunch offers a midday pause and refuel energy.
              </p>
            </div>
            <img className="h-[100%] mr-[-35px]" src="assets/lunch.png"></img>
          </div>
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-[#ffcece] overflow-hidden"
            onClick={() => router.push("/recipes/dinner")}
          >
            <div className="py-[10px] pr-[10px]">
              <p className="font-bold text-xl">Dinner</p>
              <p className="text-gray-600">
                Dinner concludes the day, winding down for rest.
              </p>
            </div>
            <img className="h-[100%] w-[175px]" src="assets/dinner.png"></img>
          </div>
          <div
            className="h-[100px] pl-[20px] flex items-center rounded-[20px] bg-green-100 overflow-hidden"
            onClick={() => router.push("/recipes/items")}
          >
            <div className="py-[10px] pr-[10px]">
              <p className="font-bold text-xl">Recipe from Food Item</p>
              <p className="text-gray-600">
                Get Recipe from food items you have at home.
              </p>
            </div>
            <img
              className="h-[100%] mr-[-35px]"
              src="assets/food_item.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipies;
