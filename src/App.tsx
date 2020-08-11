import React, { useState } from "react";
import Board from "./components/Board";

const cells = [
  [false, true, true],
  [false, true, false],
  [false, true, false],
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen h-full p-4">
      <Board rows={cells[0].length} columns={cells.length} cells={cells} />
    </div>
  );
};

// const App = () => {
//   const [mouseActive, setMouseActive] = useState<boolean>(false);
//   const [alive, setAlive] = useState<boolean>(false);

//   console.log(mouseActive);

//   return (
//     <div
//       className="min-h-screen h-full p-4"
//       onMouseDown={() => setMouseActive(true)}
//       onMouseUp={() => setMouseActive(false)}
//     >
//       <Cell
//         alive={alive}
//         onClick={() => {
//           setAlive(!alive);
//         }}
//         onHover={() => {
//           if (mouseActive) setAlive(!alive);
//         }}
//       />
//     </div>
//   );
// };

export default App;
