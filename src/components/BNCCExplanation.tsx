// src/components/BNCCExplanation.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../App";

interface BNCC {
  id: string;
  topic: string;
  explanation: string;
}

export default function BNCCExplanation() {
  const [entries, setEntries] = useState<BNCC[]>([]);
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from("bncc_entries")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setEntries(data || []);
  }

  async function handleAddEntry() {
    if (!topic || !explanation)
      return alert("Tópico e explicação são obrigatórios");
    const { data, error } = await supabase
      .from("bncc_entries")
      .insert([{ topic, explanation }])
      .select();
    if (error) console.error(error);
    else {
      setEntries([...entries, data[0]]);
      setTopic("");
      setExplanation("");
    }
  }

  async function handleDeleteEntry(id: string) {
    const { error } = await supabase.from("bncc_entries").delete().eq("id", id);
    if (error) console.error(error);
    else setEntries(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Explicação BNCC</h2>
      <input
        type="text"
        placeholder="Tópico"
        className="border p-2 rounded mb-2 w-full"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        placeholder="Explicação"
        className="border p-2 rounded mb-2 w-full"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />
      <button
        onClick={handleAddEntry}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Explicação
      </button>

      <ul className="space-y-2">
        {entries.map((e) => (
          <li
            key={e.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{e.topic}</strong>
              <p>{e.explanation}</p>
            </div>
            <button
              onClick={() => handleDeleteEntry(e.id)}
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
