import React from "react";

interface Props {
  onUpgrade: () => void;
  onBack: () => void;
}

const ProLimitWarning: React.FC<Props> = ({ onUpgrade, onBack }) => (
  <div className="p-12 text-center">
    <h2 className="text-4xl font-black mb-6">Limite do Plano Pro</h2>
    <p className="mb-8">
      Você atingiu o limite máximo permitido no seu plano atual. Para continuar,
      ative um plano superior.
    </p>
    <button
      onClick={onUpgrade}
      className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl mr-4"
    >
      Atualizar Plano
    </button>
    <button
      onClick={onBack}
      className="px-6 py-3 bg-gray-200 font-bold rounded-xl"
    >
      Voltar
    </button>
  </div>
);

export default ProLimitWarning;
