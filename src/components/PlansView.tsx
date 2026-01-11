import React from "react";

interface PlansViewProps {
  onBack: () => void;
  onSubscribePro: () => void;
  onSubscribePremium: () => void;
}

const PlansView: React.FC<PlansViewProps> = ({
  onBack,
  onSubscribePro,
  onSubscribePremium,
}) => (
  <div className="max-w-6xl mx-auto py-12 px-6 animate-fadeIn">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-black text-indigo-900 mb-4">
        Escolha o Prisma ideal para você
      </h2>
      <p className="text-lg text-indigo-900/60 font-medium">
        Soluções flexíveis para apoiar sua prática pedagógica em qualquer
        escala.
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 items-stretch mb-20">
      {/* Free, Pro e Premium cards */}
      <div className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-sm flex flex-col hover:border-indigo-100 transition-all">
        <div className="text-4xl mb-6">🌱</div>
        <h3 className="text-2xl font-black text-indigo-900 leading-tight mb-2">
          Plano Free
        </h3>
        <p className="text-indigo-900 font-black text-xl mb-4">Grátis</p>
        <button onClick={onBack}>Começar agora</button>
      </div>
      <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-xl flex flex-col relative">
        <div className="text-4xl mb-6">🚀</div>
        <h3 className="text-2xl font-black text-white mb-2">Plano Pro</h3>
        <p className="text-white font-black text-xl mb-4">R$29,90/mês</p>
        <button onClick={onSubscribePro}>Ativar Plano Pro</button>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] border-2 border-purple-50 shadow-sm flex flex-col hover:border-purple-100 transition-all">
        <div className="text-4xl mb-6">💜</div>
        <h3 className="text-2xl font-black text-purple-900 mb-2">
          Plano Premium
        </h3>
        <p className="text-purple-900 font-black text-xl mb-4">R$149/mês</p>
        <button onClick={onSubscribePremium}>Conhecer Plano Premium</button>
      </div>
    </div>
  </div>
);

export default PlansView;
