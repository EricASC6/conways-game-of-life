import React from "react";

interface Props {
  alive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onHover?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Cell: React.FC<Props> = ({
  alive = false,
  onClick = () => {},
  onHover = () => {},
}) => {
  const bg = alive ? "bg-teal-400" : "bg-gray-100";

  const cellClassName = `w-3 h-3 ${bg} 
  rounded cursor-pointer ease-in transition-colors duration-150 mr-0 md:w-4 md:h-4 lg:h-5 lg:w-5`;

  return (
    <div
      className={cellClassName}
      onClick={(e) => onClick(e)}
      onMouseEnter={(e) => onHover(e)}
    />
  );
};

export default Cell;
