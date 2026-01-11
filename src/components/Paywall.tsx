import React from "react";

interface Props {
  feature: string;
  onUpgrade: () => void;
  onBack: () => void;
}

const Paywall: React.FC<Props> = ({ feature, onUpgrade, onBack }) => (
  <div className="p-12 text-center">
    <h2 className="text-4xl font-black mb-6">{feature} 🔒</h2>
    <p className="mb-8">
      Este recurso está disponível apenas para os planos Pro e Premium.
    </p>
    <button
      onClick={onUpgrade}
      className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl mr-4"
    >
      Ativar Plano
    </button>
    <button
      onClick={onBack}
      className="px-6 py-3 bg-gray-200 font-bold rounded-xl"
    >
      Voltar
    </button>
  </div>
);

export default Paywall;
