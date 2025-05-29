import React from "react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InstructionCard from "@/components/InstructionCard";
import { ScaleLoader } from "react-spinners";

const Items = () => {
  const [inputText, setInputText] = useState("");
  const [isTextInput, setIsTextInput] = useState(false);
  const [textInputs, setTextInputs] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    details: { nutrients: {} },
  });

  const addTextInput = () => {
    if (inputText.trim() !== "") {
      setTextInputs([...textInputs, inputText]);
      setInputText("");
      setIsTextInput(false);
    }
  };

  const toggleInputType = () => {
    setIsTextInput(!isTextInput);
    if (!isTextInput) {
      setInputText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTextInput();
    }
  };
  const removeTextInput = (index) => {
    const updatedTextInputs = [...textInputs];
    updatedTextInputs.splice(index, 1);
    setTextInputs(updatedTextInputs);
  };
  const handleSubmit = () => {
    setLoading(true);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        time: "breakfast",
        food_items_at_home: textInputs.join(", "),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "https://nutrisafe.onrender.com/recipeFromFoodItemsAtHome",
        requestOptions
      );
      const result = await response.json();

      if (!result.error && result.data) {
        const { name, details, ingredients, instructions } = result.data;
        setIngredients(ingredients);
        setInstruction(instructions);
        setDetails({ name, details });
      } else {
        console.error("Error fetching recipe data:", result.error);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };
  return (
    <div className="px-[10px]">
      <div className="p-[20px] my-[10px] items-center rounded-[20px] bg-[#ffefcb]">
        <div className="flex gap-x-[20px] items-center rounded-[20px] bg-[#ffefcb] h-[60px] w-full">
          <div className="bg-white rounded-[10px] py-[10px] px-[15px]">
            <img className="h-[30px] w-[30px]" src="/assets/magic-wand.png" />
          </div>

          <p className="text-gray-600">
            We'll configure a recipe from your ingredients
          </p>
        </div>

        <div className="my-[15px] py-[10px] px-[20px] rounded-[20px] bg-white">
          {textInputs.length == 0 && <p>No Items Added</p>}

          <div className="flex flex-wrap py-[10px] gap-x-[10px]">
            {textInputs.map((text, index) => (
              <div
                className="flex py-[5px] my-[5px] px-[10px] gap-x-[5px] rounded-full border-[1px] bg-[#faeee0] border-gray-300"
                key={index}
              >
                <p>{text}</p>
                <button
                  onClick={() => removeTextInput(index)}
                  className="text-[#9px] text-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div className="py-[5px]">
            {isTextInput ? (
              <input
                className="border-[2px] rounded-lg px-[10px] py-[5px] bg-gray-100"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Add Ingredients"
                onKeyPress={handleKeyPress}
              />
            ) : (
              <button
                onClick={toggleInputType}
                className="flex py-[5px] px-[10px] gap-x-[5px] rounded-full border-[1px] bg-[#faeee0] border-gray-300"
              >
                Add Ingredients
              </button>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="h-[40px] w-[80%] rounded-[10px] bg-green-700 text-white"
            onClick={handleSubmit}
          >
            {loading ? (
              <ScaleLoader color="white" />
            ) : (
              <span>Generate Recipe!</span>
            )}
          </button>
        </div>
      </div>
      {!ingredients.length == 0 && (
        <div className="p-[10px]">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="flex gap-x-[20px]">
              <TabsTrigger className="rounded-full" value="details">
                Details
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="incredient">
                Ingredients
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="instruction">
                Instructions
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="details"
              className="mt-[10px] py-[10px] px-[15px]"
            >
              <div className="px-[10px] rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px]">
                <h1 className="text-2xl mb-[20px]">{details.name}</h1>
                <h1 className="text-xl font-bold">Nutrients:</h1>
                <div className="text-xl">
                  <p className="text-red-700">
                    Calories: {details.details.nutrients.calories}
                  </p>
                  <p className="text-green-700">
                    Carbohydrates: {details.details.nutrients.carbohydrates}
                  </p>
                  <p className="text-yellow-600">
                    Fat: {details.details.nutrients.fat}
                  </p>
                  <p className="text-blue-700">
                    Protein: {details.details.nutrients.protein}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="incredient">
              <div className="p-[15px]">
                {ingredients.map((items) => (
                  <div className="rounded-lg py-[10px] px-[20px] mb-[10px] border-gray-300 border-[1px]">
                    <p>{items}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instruction">
              <div className="p-[15px]">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                  <InstructionCard instructions={instruction} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Items;
