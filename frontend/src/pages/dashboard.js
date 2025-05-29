// import React from "react";
import { useState, React, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import default styles
import { Chart } from "chart.js";
import { useRouter } from "next/router";

const HomePage = () => {
  const value = 600;
  const router = useRouter();
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    var storedCalories =
      typeof window !== "undefined"
        ? localStorage.getItem("dailyCalories")
        : null;

    // const storedCalories = localStorage.getItem('dailyCalories');
    // storedCalories=parseInt(storedCalories)+parseInt(totalCalories);
    // const calory=localStorage.getItem('dailyCalories');
    setTotalCalories(storedCalories);
  }, [totalCalories]);

  // set dailyCalories variables in the local storage if not present
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("dailyCalories")) {
        localStorage.setItem("dailyCalories", 0);
      }
    }
  }, []);

  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            data: [100, 180, 260, 140, 200, 130, 250],
            label: "Calorie",
            borderColor: "rgb(255,165,0)",
            backgroundColor: "rgb(255,165,0,0.1)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              stepSize: 50,
            },
          },
        },
      },
    });
  }, []);

  return (
    <>
      <div className="mt-[20px] flex flex-col justify-center items-center">
        <div className="rounded-[10px] w-[95%] h-[220px] bg-white mb-4 flex justify-evenly items-center border bottom-1 ">
          <div className="w-[45%] h-[100%]  flex flex-col justify-center items-center">
            <div className="w-[70%] h-[50%]">
              <CircularProgressbar
                value={(totalCalories / 1600) * 100}
                text={totalCalories}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: "#ffa500",
                  textColor: "#ffa500",
                  trailColor: "#f9f2e2",
                  textSize: "1.5rem", // Set your desired text size
                  fontWeight: "bold",
                  pathTransitionDuration: 0.6, // Set your desired color for the trail
                })}
              />
            </div>
            <button
              class="bg-blue-400 mt-7   h-8 text-white rounded-[25px] px-3 font-bold transition duration-300 hover:bg-blue-600"
              onClick={() => router.push("/calory")}
            >
              Add Calori
            </button>
          </div>
          <div className="w-[50%] h-[100%] bg-slate-50">
            <div className="w-[183px] h-[183px] mx-auto mt-4">
              <div className=" pt-0 rounded-xl w-full h-full my-auto shadow-xl">
                <canvas id="myChart" width={200} height={200}></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mb-[20px] px-[10px] gap-x-[20px]">
          <div
            className="w-[50%] rounded-[20px] p-[10px] border-[1px] rounded-lg"
            onClick={() => router.push("/packaged")}
          >
            <img
              className="mb-[10px] rounded-[20px]"
              src="assets/packet.png"
            ></img>
            <p className="w-full text-gray-600 text-center font-bold">
              Scan Packet Food
            </p>
          </div>
          <div
            className="w-[50%] rounded-[20px] p-[10px] items-center border-[1px] rounded-lg"
            onClick={() => router.push("/scanner")}
          >
            <img
              className="mb-[10px] rounded-[20px]"
              src="assets/food.png"
            ></img>
            <p className="w-full text-gray-600 text-center font-bold">
              Scan Cooked Food
            </p>
          </div>
        </div>
        <div className="p-[10px] mb-[10px] mx-[10px] gap-x-[10px] items-center flex rounded-[15px] border-[1px]">
          <img className="w-[60px] h-[60px]" src="assets/cooking.png" />
          <div>
            <p className="text-gray-600">
              Get AI generated recipies considering your preference and
              allergies
            </p>
            <a
              onClick={() => {
                router.push("/recipes");
              }}
              className="bold text-blue-500 font-bold"
            >
              Get Recipes &rarr;{" "}
            </a>
          </div>
        </div>
        <div className="p-[10px] w-full">
          <div className="flex py-[15px] rounded-[10px] border-[1px] justify-around">
            <div className="flex w-[33%] flex-col items-center"
            
            >
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/warning.png" />
              </div>
              <p className="font-bold text-gray-600">Report</p>
            </div>
            <div
              className="flex w-[33%] flex-col items-center"
              onClick={() => router.push("/alternate")}
            >
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/rice.png" />
              </div>
              <p className="font-bold text-gray-600">Alternate Food</p>
            </div>
            {/* <div className="flex w-[33%] flex-col items-center">
              <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full border-[1px] border-gray-300">
                <img className="w-[40px]" src="assets/vegetables.png" />
              </div>
              <p className="font-bold text-gray-600">Recommend</p>
            </div> */}
          </div>
        </div>
        <div className="p-[10px]">
          <div
            className="rounded-lg border-[1px] shadow-lg border-gray-300 p-[10px]"
            onClick={() => router.push("/maps")}
          >
            <img className="rounded-lg" src="assets/map.png"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
