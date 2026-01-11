import React, { useState, useEffect } from "react";
import { supabase } from "../App";

export default function UnifiedStoryForm() {
  const [stories, setStories] = useState<any[]>([]);
  const [newStory, setNewStory] = useState("");

  useEffect(() => {
    async function fetchStories() {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setStories(data);
    }
    fetchStories();
  }, []);

  const handleAdd = async () => {
    if (!newStory) return;
    const { data, error } = await supabase
      .from("stories")
      .insert([{ content: newStory, user_id: "USUARIO_ID" }])
      .select();
    if (!error && data) setStories([data[0], ...stories]);
    setNewStory("");
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="font-bold mb-2">Histórias Unificadas</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className="border p-2 flex-1"
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          placeholder="Nova história"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>
      <ul>
        {stories.map((s) => (
          <li key={s.id} className="border-b py-1">
            {s.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
