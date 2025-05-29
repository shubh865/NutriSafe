import React from "react";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const ailes = [
  {
    id: 1,
    category: "dairy",
    image: "/assets/store_image/milk.jpeg",
    name: "Milk",
  },
  {
    id: 2,
    category: "dairy",
    image: "/assets/store_image/cheese.jpeg",
    name: "Cheese",
  },
  {
    id: 3,
    category: "bakery",
    image: "/assets/store_image/bread.jpg",
    name: "Bread",
  },
  {
    id: 4,
    category: "meat",
    image: "/assets/store_image/chicken.jpeg",
    name: "Chicken",
  },
  {
    id: 5,
    category: "produce",
    image: "/assets/store_image/apple.jpeg",
    name: "Apples",
  },
  {
    id: 6,
    category: "snacks",
    image: "/assets/store_image/chips.jpeg",
    name: "Chips",
  },
];

const StoreName = () => {
  const router = useRouter();
  const { store_name, store_details } = router.query;
  const [searchQuery, setSearchQuery] = useState("");
  const [matchingAile, setMatchingAile] = useState(null);

  const handleSearch = () => {
    const foundAile = ailes.find(
      (aile) => aile.category.toLowerCase() === searchQuery.toLowerCase()
    );

    setMatchingAile(foundAile);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <div
        className="h-[130px] bg-red-100"
        style={{ backgroundImage: 'url("/assets/store.png")' }}
      ></div>
      <div className="p-[15px]">
        <h1 className="mt-[10px] font-bold text-3xl mb-[10px]">{store_name}</h1>
        <p className="text-xl text-gray-600">{store_details}</p>
        <div className="p-[10px] shadow-top-lg">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex gap-x-[20px]">
              <TabsTrigger className="rounded-full" value="all">
                All Ailes
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="search">
                Search Ailes
              </TabsTrigger>
              <TabsTrigger className="rounded-full" value="avoid">
                Avoid Alies
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-[10px] py-[10px]">
              <div className="py-[10px] pb-[20px] overflow-x-auto flex">
                {ailes.map((aile, index) => (
                  <div
                    key={index}
                    className="px-[10px] h-[200px] min-w-[200px] rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px] mr-4"
                  >
                    <img src={aile.image} />
                    <p className="mt-[10px] flex text-xl justify-center">
                      Aile: {aile.id}
                    </p>
                    <div className="px-[5px] flex items-center justify-between">
                      <p className="font-bold text-xl flex justify-center">
                        {aile.name}
                      </p>
                      <em>{aile.category}</em>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="search">
              <div>
                <input
                  placeholder="Enter Category"
                  className="px-[10px] w-full py-[10px] border-[1px] border-blue-400 rounded-lg bg-blue-100"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="mt-[15px] flex justify-center">
                {matchingAile && (
                  <div
                    key={matchingAile.id}
                    className="px-[10px] h-[200px] min-w-[200px] rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px] mr-4"
                  >
                    <img className="w-[158px]" src={matchingAile.image} />
                    <p className="mt-[10px] flex text-xl justify-center">
                      Aile: {matchingAile.id}
                    </p>
                    <div className="px-[5px] flex items-center justify-between">
                      <p className="font-bold text-xl flex justify-center">
                        {matchingAile.name}
                      </p>
                      <em>{matchingAile.category}</em>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="avoid">
              <div className="py-[10px] pb-[20px] overflow-x-auto flex">
                {ailes
                  .filter((item) => item.category == "dairy")
                  .map((aile, index) => (
                    <div
                      key={index}
                      className="px-[10px] h-[200px] min-w-[200px] relative rounded-lg border-[1px] border-red-300 bg-red-100 px-[20px] p-[10px] mr-4"
                    >
                       <img src={aile.image} alt="Aile Image" className="w-full h-auto" />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    
                      <p className="mt-[10px] flex text-xl justify-center">
                        Aile: {aile.id}
                      </p>
                      <div className="px-[5px] flex items-center justify-between">
                        <p className="font-bold text-xl flex justify-center">
                          {aile.name}
                        </p>
                        <em>{aile.category}</em>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StoreName;
