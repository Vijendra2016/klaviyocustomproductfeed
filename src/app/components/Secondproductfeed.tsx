"use client";

import { useState, useEffect } from "react";
import { Trash2, SquarePlus } from "lucide-react";

interface JsonItem {
  id: string;
  isNew?: boolean;
}

export default function Secondproductfeed() {
  const [items, setItems] = useState<JsonItem[]>([]);
  const [newId, setNewId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch Gist JSON
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await fetch(
          "/api/fetch-second-product-feed"
        );
        const data = await response.json();

        const jsonContent: string = data.files["secondproductfeed.json"].content;
        const parsedData: JsonItem[] = JSON.parse(jsonContent);

        // Mark all as read-only
        setItems(parsedData.map((item) => ({ ...item, isNew: false })));
      } catch (err) {
        console.error("Error fetching gist:", err);
      }
    };

    fetchGist();
  }, []);

  // Add new ID
  const addItem = () => {
    if (!newId.trim()) return;
    setItems([...items, { id: newId.trim(), isNew: true }]);
    setNewId("");
  };

  // Delete item
  const deleteItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Update Gist
  const updateGist = async () => {
    try {
      const gistData = items.map(({ id }) => ({ id }));

      const response = await fetch("/api/update-second-product-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonData: gistData }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Webfeed is  updated successfully!");
        // Lock items as saved
        setItems(items.map((item) => ({ ...item, isNew: false })));
      } else {
        setMessage("❌ Error: " + (data.error || "Unknown server error"));
      }
    } catch (err) {
      setMessage("❌ Unknown error occurred");
    }
  };

  return (
<div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
      <h1 className="text-lg font-semibold text-black font-[family-name:var(--font-geist-mono)]">Klaviyo Custom product Feed</h1>
      <p className=" text-gray-800 text-sm	 font-[family-name:var(--font-geist-mono)]">Enter Variant or Product ID on klaviyo </p>

      <ul className="w-full">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={item.id}
              readOnly={!item.isNew}
              onChange={(e) => {
                if (item.isNew) {
                  const updated = [...items];
                  updated[index].id = e.target.value;
                  setItems(updated);
                }
              }}
              className={`border border-gray-300 rounded-lg px-3 py-2 text-gray-700 w-56
                          focus:outline-none focus:ring-2 focus:ring-gray-400
                          focus:border-gray-400 transition ${
                            !item.isNew ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
            />
            <button
              onClick={() => deleteItem(index)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer"
            >
              <Trash2 className="w-5 h-5" /> Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add New */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Enter new ID"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          className="border border-black rounded-lg px-3 py-2 text-gray-700 w-56 ring-green-400 
                     focus:outline-none focus:ring-2 focus:ring-green-400 bg-white
                     focus:border-green-400 transition"
        />
        <button
          onClick={addItem}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 cursor-pointer"
        >
          <SquarePlus className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Update Button */}
     <div className="flex  w-full mt-2">
    <button
      onClick={updateGist}
      className="flex items-center  gap-2 bg-orange-500 hover:bg-orange-600
                 text-black font-medium px-8 py-3 rounded-full transition cursor-pointer"
    >
      Update Web Feed for Product
    </button>
  </div>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
