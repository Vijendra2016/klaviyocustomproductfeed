"use client";

import { useState, useEffect } from "react";
import { Trash2, SquarePlus } from "lucide-react";

interface JsonItem {
  id: string;      // Key
  label: string;   // Value
  isNew?: boolean; // New entries editable
}

export default function KeyValueEditor() {
  const [items, setItems] = useState<JsonItem[]>([]);
  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [message, setMessage] = useState("");

  // Fetch Gist JSON (key-value format)
  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/gists/aadfaef61cabe648e09ab848d2d23e31"
        );
        const data = (await response.json()) as {
          files: Record<string, { content: string }>;
        };

        const jsonContent = data.files["gistfile1.json"].content;
        const parsedData: Record<string, string> = JSON.parse(jsonContent);

        // Convert to array (all existing items are read-only)
        const existingItems: JsonItem[] = Object.entries(parsedData).map(
          ([id, label]) => ({ id, label, isNew: false })
        );

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

  // Add a new key-value (editable)
  const addItem = () => {
    if (!newId.trim() || !newLabel.trim()) return;
    setItems([...items, { id: newId.trim(), label: newLabel.trim(), isNew: true }]);
    setNewId("");
    setNewLabel("");
  };

  // Delete an item
  const deleteItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Update Gist (save and mark all items as read-only)
  const updateGist = async () => {
    try {
      // Convert array back to key-value object
      const gistData: Record<string, string> = {};
      items.forEach(({ id, label }) => {
        gistData[id] = label;
      });

      const response = await fetch("/api/update-gist-keyvalue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonData: gistData }),
      });

      const data = (await response.json()) as { error?: string };
      if (response.ok) {
        setMessage("✅ Gist updated successfully!");

        // Mark all items as saved (read-only now)
        const updatedItems = items.map((item) => ({ ...item, isNew: false }));
        setItems(updatedItems);
      } else {
        setMessage("❌ Error: " + (data.error || "Unknown server error"));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("❌ Error: " + err.message);
      } else {
        setMessage("❌ Unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Key-Value Feed Editor</h2>

      <ul className="w-full">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 mb-3">
            {/* ID input (read-only unless new) */}
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

            {/* Label input (read-only unless new) */}
            <input
              type="text"
              value={item.label}
              readOnly={!item.isNew}
              onChange={(e) => {
                if (item.isNew) {
                  const updated = [...items];
                  updated[index].label = e.target.value;
                  setItems(updated);
                }
              }}
              className={`border border-gray-300 rounded-lg px-3 py-2 text-gray-700 flex-1
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
          placeholder="New ID"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 w-56
                     focus:outline-none focus:ring-2 focus:ring-green-400 
                     focus:border-green-400 transition"
        />
        <input
          type="text"
          placeholder="New Label"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 flex-1
                     focus:outline-none focus:ring-2 focus:ring-green-400 
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
      <button
        onClick={updateGist}
        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600
                   text-black font-medium px-8 py-3 rounded-full transition cursor-pointer mt-4"
      >
        Update Web Feed
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
