import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg p-3"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
