// src/components/VisualMaterialForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../App";

interface VisualMaterial {
  id: string;
  title: string;
  url: string;
}

export default function VisualMaterialForm() {
  const [materials, setMaterials] = useState<VisualMaterial[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    const { data, error } = await supabase
      .from("visual_materials")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setMaterials(data || []);
  }

  async function handleAddMaterial() {
    if (!title || !url) return alert("Título e URL são obrigatórios");
    const { data, error } = await supabase
      .from("visual_materials")
      .insert([{ title, url }])
      .select();
    if (error) console.error(error);
    else {
      setMaterials([...materials, data[0]]);
      setTitle("");
      setUrl("");
    }
  }

  async function handleDeleteMaterial(id: string) {
    const { error } = await supabase
      .from("visual_materials")
      .delete()
      .eq("id", id);
    if (error) console.error(error);
    else setMaterials(materials.filter((m) => m.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Materiais Visuais</h2>
      <input
        type="text"
        placeholder="Título"
        className="border p-2 rounded mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL"
        className="border p-2 rounded mb-2 w-full"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleAddMaterial}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Material
      </button>

      <ul className="space-y-2">
        {materials.map((m) => (
          <li
            key={m.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-700"
            >
              {m.title}
            </a>
            <button
              onClick={() => handleDeleteMaterial(m.id)}
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
