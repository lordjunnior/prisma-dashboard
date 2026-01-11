// src/components/ActivityForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function ActivityForm() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Carrega atividades do Supabase ao montar o componente
  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: true });

    if (error) console.error(error);
    else setActivities(data || []);
  }

  async function handleAddActivity() {
    if (!title || !date) return alert("Título e data são obrigatórios");

    const { data, error } = await supabase
      .from("activities")
      .insert([{ title, description, date }])
      .select();

    if (error) console.error(error);
    else {
      setActivities([...activities, data[0]]);
      setTitle("");
      setDescription("");
      setDate("");
    }
  }

  async function handleDeleteActivity(id: string) {
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) console.error(error);
    else setActivities(activities.filter((a) => a.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Atividades</h2>

      <input
        type="text"
        placeholder="Título"
        className="border p-2 rounded mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        className="border p-2 rounded mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded mb-2 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={handleAddActivity}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Atividade
      </button>

      <ul className="space-y-2">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{activity.title}</strong>
              <p>{activity.description}</p>
              <small>{activity.date}</small>
            </div>
            <button
              onClick={() => handleDeleteActivity(activity.id)}
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
