import React from "react";
import GameBoard from "./components/GameBoard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen h-full px-4 m-auto flex flex-col">
      <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
        Conway's Game of <span className="text-teal-400 underline">Life</span>
      </h2>

      <div className="md:m-auto">
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
