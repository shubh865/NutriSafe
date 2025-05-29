import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScaleLoader } from "react-spinners";
import InstructionCard from "@/components/InstructionCard";

const Dinner = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    details: { nutrients: {} },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          time: "dinner",
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "https://nutrisafe.onrender.com/recipe",
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
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div
        className="h-[150px] bg-center bg-cover bg-red-100"
        style={{ backgroundImage: 'url("/assets/dinner.png")' }}
      >
        <div className="min-w-full min-h-full bg-[#0000004d]"></div>
      </div>{" "}
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
          {!isLoading ? <>
          <TabsContent
            value="details"
            className="mt-[10px] py-[10px] px-[15px]"
          >
            <div className="rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px]">
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
            </>
            :
            <div className="mt-[200px] w-full flex justify-center">
              <ScaleLoader color="#da7bae" />
            </div>
          }
        </Tabs>
      </div>
    </div>
  );
};

export default Dinner;
