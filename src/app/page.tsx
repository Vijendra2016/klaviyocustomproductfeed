"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import KeyValueEditor from "./components/KeyValueEditor";



interface JsonItem {
  id: string;
  isNew?: boolean; // flag to detect new entries
}

export default function Home() {
  const [items, setItems] = useState<JsonItem[]>([]);
  const [newId, setNewId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch latest gist JSON from GitHub API
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/gists/478e7b10fade2d4953b2563c6319490b"
        );
        const data = await response.json();

        const jsonContent: string = data.files["viditest.json"].content;
        const parsedData: JsonItem[] = JSON.parse(jsonContent) as JsonItem[];

        // Mark all existing items as not new (read-only)
        const existingItems: JsonItem[] = parsedData.map((item: JsonItem) => ({
          ...item,
          isNew: false,
        }));

        setItems(existingItems);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching gist:", err.message);
        } else {
          console.error("Unknown error fetching gist");
        }
      }
    };

    fetchGist();
  }, []);

  // Add a new ID
  const addItem = () => {
    if (!newId.trim()) return;
    setItems([...items, { id: newId.trim(), isNew: true }]);
    setNewId("");
  };

  // Delete an ID
  const deleteItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Update Gist (save all items to Gist)
  const updateGist = async () => {
    try {
      // Strip isNew before sending to Gist
      const gistData: { id: string }[] = items.map(({ id }) => ({ id }));

      const response = await fetch("/api/update-gist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonData: gistData }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Gist updated successfully!");

        // Refresh latest data from GitHub API after save
        const latest = await fetch(
          "https://api.github.com/gists/478e7b10fade2d4953b2563c6319490b"
        );
        const latestData = await latest.json();
        const jsonContent: string = latestData.files["viditest.json"].content;

        const refreshedItems: JsonItem[] = (JSON.parse(jsonContent) as JsonItem[]).map(
          (item: JsonItem) => ({ ...item, isNew: false })
        );

        setItems(refreshedItems);
      } else {
        setMessage("❌ Error: " + (data.error || "Unknown server error"));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("❌ Error: " + err.message);
      } else {
        setMessage("❌ An unknown error occurred");
      }
    }
  };

  return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">


      <Image
        className="dark:invert"
        src="https://cdn.shopify.com/s/files/1/2423/6599/files/logolockup_sticker.png"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        unoptimized
      />

<main className="flex flex-col gap-[12px] row-start-2 items-center sm:items-start">
        
        <div className="w-full">
           <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mt-8 mb-4">
 Klaviyo Custom Feed
</h1>
      <h1> Enter Variant or Product ID</h1>

      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: 8 }} className="flex pb-3">
            <input
              type="text"
              value={item.id}
              readOnly={!item.isNew} // Existing IDs are read-only
              onChange={(e) => {
                if (item.isNew) {
                  const updated = [...items];
                  updated[index].id = e.target.value;
                  setItems(updated);
                }
              }}
              style={{
                marginRight: 10,
                backgroundColor: item.isNew ? "white" : "#f0f0f0",
                cursor: item.isNew ? "text" : "not-allowed",
              }}
               className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-gray-400 
                   focus:border-gray-400 transition w-56"
            />
            <button onClick={() => deleteItem(index)}       className="flex  cursor-pointer	 items-center gap-2 text-red-600 hover:text-red-800"
> <Trash2 className="w-5 h-5" /> Delete</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 10 }} className="flex">
        <input
          type="text"
          placeholder="Enter new ID"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          style={{ marginRight: 10 }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-green-400 
                   focus:border-green-400 transition w-56"
        />
        <button onClick={addItem} className="flex items-center cursor-pointer	 gap-2 text-green-600 hover:text-green-800"> <SquarePlus className="w-5 h-5" /> Add</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={updateGist} className="flex items-center justify-center gap-2 
             bg-orange-500 hover:bg-orange-600 
             text-black font-medium 
             px-8 py-3 rounded-full 
             transition cursor-pointer">Update Web Feed</button>
      </div>

      <p>{message}</p>
       </div>

       <KeyValueEditor/>
      </main>
       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
        <p className="tracking-[-.01em]">
            Custom App develop by Retrospec Tech team
          </p>
        
      </footer>
    </div>
    
  );
}
