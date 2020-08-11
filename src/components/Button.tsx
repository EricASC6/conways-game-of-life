import React from "react";

interface Props {
  bg?: string;
  color?: string;
  borderColor?: string;
  borderWidth?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({
  children,
  bg = "teal-400",
  borderColor = "",
  color = "white",
  borderWidth = "0",
  onClick = () => {},
}) => {
  const className = `rounded py-2 px-6 outline-none bg-${bg} text-${color} 
   border-${borderColor} border-${borderWidth}`;

  return (
    <button className={className} onClick={(e) => onClick(e)}>
      {children}
    </button>
  );
};

export default Button;
