import React from "react";

interface Props {
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const SelectorBtn: React.FC<Props> = ({
  active,
  children,
  onClick = () => {},
}) => {
  const className = active
    ? "px-4 py-1 bg-teal-400 text-white align-center rounded-full w-auto inline-block text-sm"
    : "px-4 py-1 bg-gray-200 text-gray-700 align-center rounded-full w-auto inline-block border-2 border-gray-300 text-sm";

  return (
    <button className={className} onClick={(e) => onClick(e)}>
      {children}
    </button>
  );
};

export default SelectorBtn;
