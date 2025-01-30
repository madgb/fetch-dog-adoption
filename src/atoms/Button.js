import React from "react";

export default function Button({
  onClick = () => {},
  className = "",
  disabled = false,
  children,
}) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
