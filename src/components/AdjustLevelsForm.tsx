// src/components/AdjustLevelsForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../App";

interface Level {
  id: string;
  name: string;
  description: string;
}

export default function AdjustLevelsForm() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchLevels();
  }, []);

  async function fetchLevels() {
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setLevels(data || []);
  }

  async function handleAddLevel() {
    if (!name) return alert("Nome é obrigatório");
    const { data, error } = await supabase
      .from("levels")
      .insert([{ name, description }])
      .select();
    if (error) console.error(error);
    else {
      setLevels([...levels, data[0]]);
      setName("");
      setDescription("");
    }
  }

  async function handleDeleteLevel(id: string) {
    const { error } = await supabase.from("levels").delete().eq("id", id);
    if (error) console.error(error);
    else setLevels(levels.filter((l) => l.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Níveis de Ajuste</h2>
      <input
        type="text"
        placeholder="Nome do Nível"
        className="border p-2 rounded mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        className="border p-2 rounded mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleAddLevel}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Nível
      </button>

      <ul className="space-y-2">
        {levels.map((level) => (
          <li
            key={level.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{level.name}</strong>
              <p>{level.description}</p>
            </div>
            <button
              onClick={() => handleDeleteLevel(level.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
