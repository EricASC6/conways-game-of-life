import React from "react";
import GameBoard from "./components/GameBoard";

const App: React.FC = () => {
  return (
    <div className="flex flex-col align-start min-h-screen h-full p-4">
      <h2 className="text-4xl font-semibold text-gray-700 text-center">
        Conway's Game of <span className="text-teal-400 underline">Life</span>
      </h2>

      <div className="my-auto">
        <GameBoard />
      </div>
    </div>
  );
};

export default App;
