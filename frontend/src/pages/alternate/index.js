import React from "react";
import { useRouter } from "next/router";

const Alternate = () => {
  const router = useRouter();
  return (
    <div className="p-[20px] flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-[20px]">Select Option</h1>
      <div
        className="mx-auto bg-cover flex flex-col justify-end bg-center w-[250px] h-[200px] mb-[40px] rounded-[20px] bg-red-100"
        onClick={()=>{router.push('/alternate/food')}}
        style={{ backgroundImage: 'url("assets/alternative_food.png")' }}
      >
        <p className="mt-[10px] h-[60px] flex justify-center rounded-b-[20px] bg-[#ffffff80] font-bold text-xl flex justify-center items-center">
          Get Alternative Food
        </p>
      </div>
      <div
        className="mx-auto bg-cover flex flex-col justify-end bg-center w-[250px] h-[200px] mb-[40px] rounded-[20px] bg-red-100"
        style={{ backgroundImage: 'url("assets/allergen_food.png")' }}
        onClick={()=>{router.push('/alternate/allergens')}}

      >
        <p className="mt-[10px] h-[60px] flex text-center px-[15px] rounded-b-[20px] bg-[#ffffff80] font-bold text-xl flex justify-center items-center">
          Get Similar Allergies Food
        </p>
      </div>
    </div>
  );
};

export default Alternate;
