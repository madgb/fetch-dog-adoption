import React from "react";

export default function Button({
  onClick = () => {},
  className = "",
  disabled = false,
  children,
}) {
  return (
    <button onClick={onClick} className={["cursor-pointer", className].filter(Boolean).join(" ")} disabled={disabled}>
      {children}
    </button>
  );
}
