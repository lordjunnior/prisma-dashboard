// src/App.tsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PlansView from "./components/PlansView";
import WelcomeProView from "./components/WelcomeProView";
import LimitReached from "./components/LimitReached";
import Paywall from "./components/Paywall";
import ActivityForm from "./components/ActivityForm";
import UnifiedStoryForm from "./components/UnifiedStoryForm";
import LessonPlanForm from "./components/LessonPlanForm";
import AdjustLevelsForm from "./components/AdjustLevelsForm";
import VisualMaterialForm from "./components/VisualMaterialForm";
import ParentSummaryForm from "./components/ParentSummaryForm";
import BNCCExplanation from "./components/BNCCExplanation";
import ProLimitWarning from "./components/ProLimitWarning";

import { loadStripe } from "@stripe/stripe-js";

// Stripe
const stripePromise = loadStripe(
  "pk_live_51So1StK5OMLQKWYyKcyDl5Buq5rZ7PVL7m9ud6C0cuc3C7wud3kX7ctmCQvv370CCdlrWwUC5BpvTiJDwukZOkGe00yxP7Eaif"
);

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [userPlan, setUserPlan] = useState("free");
  const [featureToUnlock, setFeatureToUnlock] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState("user_free");

  const handleUpgrade = async (planId: string) => {
    const stripe = await stripePromise;
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId }),
    });
    const { url } = await res.json();
    if (stripe && url) stripe.redirectToCheckout({ sessionId: url });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex gap-2 p-2 bg-gray-200">
        <button
          onClick={() => setCurrentUserId("user_free")}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Free
        </button>
        <button
          onClick={() => setCurrentUserId("user_pro")}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Pro
        </button>
        <button
          onClick={() => setCurrentUserId("user_prem")}
          className="px-2 py-1 bg-purple-500 text-white rounded"
        >
          Premium
        </button>
      </div>

      <Navbar
        activeView={activeView}
        changeView={setActiveView}
        userPlan={userPlan}
      />

      {activeView === "dashboard" && (
        <>
          <ActivityForm />
          <UnifiedStoryForm />
          <LessonPlanForm />
          <AdjustLevelsForm />
          <VisualMaterialForm />
          <ParentSummaryForm />
          <BNCCExplanation />
          <ProLimitWarning />
          {userPlan === "free" && (
            <LimitReached
              onUpgrade={() => handleUpgrade("plano_pro")}
              onBack={() => setActiveView("dashboard")}
            />
          )}
        </>
      )}

      {activeView === "plans" && (
        <PlansView
          onBack={() => setActiveView("dashboard")}
          onSubscribePro={() => handleUpgrade("plano_pro")}
          onSubscribePremium={() => handleUpgrade("plano_premium")}
        />
      )}

      {featureToUnlock && (
        <Paywall
          feature={featureToUnlock}
          onUpgrade={() => handleUpgrade("plano_pro")}
          onBack={() => setFeatureToUnlock(null)}
        />
      )}

      {activeView === "welcome_pro" && (
        <WelcomeProView onStart={() => setActiveView("dashboard")} />
      )}
    </div>
  );
}
