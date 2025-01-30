import React from "react";

export default function Select({
  multiple = false,
  onChange = () => {},
  className = "",
  children,
}) {
  return (
    <select multiple={multiple} onChange={onChange} className={className}>
      {children}
    </select>
  );
}
