import React from "react";

interface NavbarProps {
  activeView: string;
  changeView: (view: string) => void;
  userPlan: string;
}

const Navbar: React.FC<NavbarProps> = ({
  activeView,
  changeView,
  userPlan,
}) => (
  <nav className="bg-indigo-600 p-4 text-white flex justify-between items-center">
    <div className="font-black text-lg">PRISMA ENSINO</div>
    <div className="flex gap-4">
      {["dashboard", "plans"].map((view) => (
        <button
          key={view}
          onClick={() => changeView(view)}
          className={`font-bold ${activeView === view ? "underline" : ""}`}
        >
          {view.toUpperCase()}
        </button>
      ))}
    </div>
    <div>{userPlan.toUpperCase()}</div>
  </nav>
);

export default Navbar;
