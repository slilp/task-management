import React from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isActive: boolean;
  type?: "button" | "submit" | "reset";
}

function TabChip({ isActive = false, children, ...props }: ButtonProps) {
  return (
    <button
      data-testid={
        isActive
          ? `tab-chip-${props.id}-active-btn`
          : `tab-chip-${props.id}-btn`
      }
      className={`flex-1 transition-all duration-200 font-bold rounded-3xl p-2 ${
        isActive
          ? "bg-purple-500 text-white"
          : "hover:bg-purple-100 text-gray-400"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export default TabChip;
