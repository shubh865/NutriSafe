// import { AppContext } from "@/context/appContext";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const Category = [
  {
    id: 1,
    name: "Veg",
  },
  {
    id: 2,
    name: "Non Veg",
  },
  {
    id: 3,
    name: "Jain",
  },
  {
    id: 6,
    name: "Keto",
  },
  {
    id: 7,
    name: "Paleo",
  },
  {
    id: 8,
    name: "Halal",
  },
  {
    id: 12,
    name: "Vegan",
  },
  {
    id: 13,
    name: "Pescatarian",
  },
];

const Allergens = [
  {
    id: 1,
    name: "Gluten",
  },
  {
    id: 2,
    name: "Dairy",
  },
  {
    id: 3,
    name: "Nuts",
  },
  {
    id: 4,
    name: "Shellfish",
  },
  {
    id: 5,
    name: "Fish",
  },
  {
    id: 6,
    name: "Eggs",
  },
  {
    id: 7,
    name: "Wheat",
  },
  {
    id: 8,
    name: "Soy",
  },
  {
    id: 9,
    name: "Corn",
  },
  {
    id: 10,
    name: "Citrus Fruits",
  },
  {
    id: 11,
    name: "Low Carb",
  },
  // Add more categories as needed
];

const AllergensFoodItem = [
  { id: 1, name: "Milk" },
  { id: 2, name: "Almonds" },
  { id: 3, name: "Peanuts" },
  { id: 4, name: "Eggs" },
  { id: 5, name: "Soy" },
  { id: 6, name: "Wheat" },
  { id: 7, name: "Shellfish" },
  { id: 8, name: "Fish" },
  { id: 9, name: "Hazelnuts" },
  { id: 10, name: "Cashews" },
  { id: 11, name: "Brazil Nuts" },
  { id: 12, name: "Pecans" },
  { id: 13, name: "Walnuts" },
  { id: 14, name: "Pistachios" },
  { id: 15, name: "Sesame Seeds" },
  { id: 16, name: "Mustard" },
  { id: 17, name: "Lactose" },
  { id: 18, name: "Gluten" },
  { id: 19, name: "Corn" },
  { id: 20, name: "Tomatoes" },
];

const width_helper = {
  25: "w-[25%]",
  50: "w-[50%]",
  75: "w-[75%]",
};

const selectAllergens = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState("food");
  const [currentStepCount, setCurrentStepCount] = useState(25);

  const [selectedFoodCategory, setSelectedFoodCategory] = useState("");
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onBackClickHandler = () => {
    router.back();
  };

  const onAllergensClickHandler = (allergens) => {
    if (selectedAllergens.includes(allergens)) {
      setSelectedAllergens(
        selectedAllergens.filter(
          (allergensObj) => allergensObj.id != allergens.id
        )
      );
    } else {
      setSelectedAllergens([...selectedAllergens, allergens]);
    }
  };

  const onFoodClickHandler = (foodItem) => {
    if (selectedFoodItems.includes(foodItem)) {
      setSelectedFoodItems(
        selectedFoodItems.filter((itemObj) => itemObj.id != foodItem.id)
      );
    } else {
      setSelectedFoodItems([...selectedFoodItems, foodItem]);
    }
  };

  const handleContinue = () => {
    if (currentStep == "food") {
      setCurrentStep("allergens_category");
      setCurrentStepCount(50);
    } else if (currentStep == "allergens_category") {
      setCurrentStep("allergens_items");
      setCurrentStepCount(75);
    } else if (currentStep == "allergens_items") {
      setIsLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      
      let allergenNames = []
      selectedAllergens.forEach((allergens) => {
        allergenNames.push(allergens.name);
      });

      let foodItems = []
      selectedFoodItems.forEach((foodItem) => {
        foodItems.push(foodItem.name);
      });

      
      var raw = JSON.stringify({
        mobile_number: "9137357003",
        allergens: allergenNames,
        allergy_foods: foodItems,
        food_preferences: selectedFoodCategory.name,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("https://nutrisafe.onrender.com/addAllergies", requestOptions)
        .then((response) => {
          console.log(response);
          router.push("/dashboard");
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-[60px] items-center justify-center relative">
        <div className=" absolute left-[20px]" onClick={onBackClickHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>

        <div className=" font-semibold text-[20px]">Food Profile</div>
      </div>

      <div class="mx-auto rounded-md bg-gray-200 w-[90%]">
        <div
          class={`bg-green-700 rounded-l-md ${width_helper[currentStepCount]} text-white text-center`}
        >
          {currentStepCount} %
        </div>
      </div>

      <div className="h-[75vh] flex flex-col min-w-[90%] self-center mt-[10px] gap-y-[20px] overflow-scroll">
        {currentStep === "food" && (
          <div
            id="food_category"
            className="flex flex-col w-full rounded-[10px] px-[20px] py-[15px] border-[#da7bae]"
          >
            <div className="font-bold">Select Category</div>
            <div className="flex flex-row flex-wrap gap-x-[10px] mt-[15px] gap-y-[10px]">
              {Category.map((food_category) => {
                return (
                  <div
                    key={food_category.id}
                    className={`px-[10px] py-[5px] box-border rounded-lg border-solid border-[1px] border-[#da7bae] text-[16px] ${
                      selectedFoodCategory == food_category
                        ? "bg-[#da7bae] text-white"
                        : "bg-white "
                    }`}
                    onClick={() => setSelectedFoodCategory(food_category)}
                  >
                    {food_category.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {currentStep === "allergens_category" && (
          <div
            id="allergens_category"
            className="flex flex-col w-full rounded-[10px] px-[20px] py-[15px] box-border"
          >
            <div className="font-bold">
              Select any allergens you need to avoid
            </div>
            <div className="flex flex-row flex-wrap gap-x-[10px] mt-[15px] gap-y-[10px]">
              {Allergens.map((allergens) => {
                return (
                  <div
                    key={allergens.id}
                    className={`px-[10px] py-[5px] box-border rounded-lg border-solid border-[1px] border-[#4EA670] text-[16px] ${
                      selectedAllergens.includes(allergens)
                        ? "bg-[#4ebb78] text-white"
                        : "bg-white "
                    }`}
                    onClick={() => onAllergensClickHandler(allergens)}
                  >
                    {allergens.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {currentStep === "allergens_items" && (
          <div
            id="allergens_items"
            className="flex flex-col w-full rounded-[10px] px-[20px] py-[15px] box-border"
          >
            <div className="font-bold">
              Select any food items you need to avoid
            </div>
            <div className="flex flex-row flex-wrap gap-x-[10px] mt-[15px] gap-y-[10px]">
              {AllergensFoodItem.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`px-[10px] py-[5px] box-border rounded-lg border-solid border-[1px] border-[#4EA670] text-[16px] ${
                      selectedFoodItems.includes(item)
                        ? "bg-[#4ebb78] text-white"
                        : "bg-white "
                    }`}
                    onClick={() => onFoodClickHandler(item)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {!isLoading ? (
        <div
          className="w-[90%] h-[40px] flex items-center justify-center mt-auto mb-[20px] self-center rounded-[5px] bg-[#DE8F90] font-semibold text-white cursor-pointer"
          onClick={handleContinue}
        >
          Continue
        </div>
      ) : (
        <div className="w-[90%] h-[40px] flex items-center justify-center mt-auto mb-[20px] self-center rounded-[5px] font-semibold text-white cursor-pointer">
          <ScaleLoader color="#DE8F90" />
        </div>
      )}
    </div>
  );
};

export default selectAllergens;
