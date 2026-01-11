// src/components/ParentSummaryForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../App";

interface Summary {
  id: string;
  parentName: string;
  notes: string;
}

export default function ParentSummaryForm() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [parentName, setParentName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchSummaries();
  }, []);

  async function fetchSummaries() {
    const { data, error } = await supabase
      .from("parent_summaries")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setSummaries(data || []);
  }

  async function handleAddSummary() {
    if (!parentName || !notes)
      return alert("Nome do responsável e notas são obrigatórios");
    const { data, error } = await supabase
      .from("parent_summaries")
      .insert([{ parentName, notes }])
      .select();
    if (error) console.error(error);
    else {
      setSummaries([...summaries, data[0]]);
      setParentName("");
      setNotes("");
    }
  }

  async function handleDeleteSummary(id: string) {
    const { error } = await supabase
      .from("parent_summaries")
      .delete()
      .eq("id", id);
    if (error) console.error(error);
    else setSummaries(summaries.filter((s) => s.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Resumo para Pais</h2>
      <input
        type="text"
        placeholder="Nome do responsável"
        className="border p-2 rounded mb-2 w-full"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
      />
      <textarea
        placeholder="Notas"
        className="border p-2 rounded mb-2 w-full"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        onClick={handleAddSummary}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Resumo
      </button>

      <ul className="space-y-2">
        {summaries.map((s) => (
          <li
            key={s.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{s.parentName}</strong>
              <p>{s.notes}</p>
            </div>
            <button
              onClick={() => handleDeleteSummary(s.id)}
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
