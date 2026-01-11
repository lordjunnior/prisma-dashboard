// src/components/LessonPlanForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface LessonPlan {
  id: string;
  name: string;
  description: string;
}

export default function LessonPlanForm() {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const { data, error } = await supabase
      .from("lesson_plans")
      .select("*")
      .order("id", { ascending: true });
    if (error) console.error(error);
    else setPlans(data || []);
  }

  async function handleAddPlan() {
    if (!name) return alert("Nome é obrigatório");
    const { data, error } = await supabase
      .from("lesson_plans")
      .insert([{ name, description }])
      .select();
    if (error) console.error(error);
    else {
      setPlans([...plans, data[0]]);
      setName("");
      setDescription("");
    }
  }

  async function handleDeletePlan(id: string) {
    const { error } = await supabase.from("lesson_plans").delete().eq("id", id);
    if (error) console.error(error);
    else setPlans(plans.filter((p) => p.id !== id));
  }

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Planos de Aula</h2>
      <input
        type="text"
        placeholder="Nome do Plano"
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
        onClick={handleAddPlan}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Adicionar Plano
      </button>

      <ul className="space-y-2">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className="p-2 border rounded flex justify-between items-center"
          >
            <div>
              <strong>{plan.name}</strong>
              <p>{plan.description}</p>
            </div>
            <button
              onClick={() => handleDeletePlan(plan.id)}
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
