"use client";
import { useState } from "react";

interface Food {
  type: string;
  name: string;
}

export default function Home() {
  const initialData: Food[] = [
    { type: "Fruit", name: "Apple" },
    { type: "Vegetable", name: "Broccoli" },
    { type: "Vegetable", name: "Mushroom" },
    { type: "Fruit", name: "Banana" },
    { type: "Vegetable", name: "Tomato" },
    { type: "Fruit", name: "Orange" },
    { type: "Fruit", name: "Mango" },
    { type: "Fruit", name: "Pineapple" },
    { type: "Vegetable", name: "Cucumber" },
    { type: "Fruit", name: "Watermelon" },
    { type: "Vegetable", name: "Carrot" },
  ];

  const [mainList, setMainList] = useState<Food[]>(initialData);
  const [fruitList, setFruitList] = useState<Food[]>([]);
  const [vegetableList, setVegetableList] = useState<Food[]>([]);

  const handleMoveToColumn = (item: Food) => {
    setMainList((prev) => prev.filter((food) => food.name !== item.name));

    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
      setTimeout(() => moveToMainList(item, "Fruit"), 5000);
    } else if (item.type === "Vegetable") {
      setVegetableList((prev) => [...prev, item]);
      setTimeout(() => moveToMainList(item, "Vegetable"), 5000);
    }
  };

  const moveToMainList = (item: Food, type: string) => {
    if (type === "Fruit") {
      setFruitList((prev) => prev.filter((food) => food.name !== item.name));
    } else if (type === "Vegetable") {
      setVegetableList((prev) => prev.filter((food) => food.name !== item.name));
    }

    setMainList((prev) => {
      if (!prev.some((food) => food.name === item.name)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const handleImmediateReturn = (item: Food, type: string) => {
    moveToMainList(item, type);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-8 p-4 sm:p-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
        {/* Main List */}
        <Column title="Main List" items={mainList} onClick={handleMoveToColumn} />

        {/* Fruit Column */}
        <Column
          title="Fruits"
          items={fruitList}
          onClick={(item) => handleImmediateReturn(item, "Fruit")}
        />

        {/* Vegetable Column */}
        <Column
          title="Vegetables"
          items={vegetableList}
          onClick={(item) => handleImmediateReturn(item, "Vegetable")}
        />
      </div>
    </div>
  );
}

interface ColumnProps {
  title: string;
  items: Food[];
  onClick: (item: Food) => void;
}

const Column = ({ title, items, onClick }: ColumnProps) => {
  return (
    <div className="flex flex-col items-center border w-full">
      <div className="w-full text-center bg-gray-200 p-2">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex flex-wrap w-full">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => onClick(item)}
            className="p-2 shadow-sm border transition w-full mx-2 my-1 font-bold hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};
