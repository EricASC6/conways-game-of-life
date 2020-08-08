import React from "react";

interface Props {
  alive?: boolean;
}

const Cell: React.FC<Props> = ({ alive = false }) => {
  const bg = alive ? "bg-teal-400" : "bg-gray-100";

  const cellClassName = `p-2 w-6 h-6 ${bg} rounded`;

  return <div className={cellClassName}></div>;
};

export default Cell;
