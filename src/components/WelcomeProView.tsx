import React from "react";

interface Props {
  onStart: () => void;
}

const WelcomeProView: React.FC<Props> = ({ onStart }) => (
  <div className="p-12 text-center">
    <h2 className="text-4xl font-black mb-6">Bem-vindo ao Plano Pro!</h2>
    <p className="mb-8">
      Agora você tem acesso a todas as ferramentas avançadas do PRISMA ENSINO.
    </p>
    <button
      onClick={onStart}
      className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl"
    >
      Começar
    </button>
  </div>
);

export default WelcomeProView;
