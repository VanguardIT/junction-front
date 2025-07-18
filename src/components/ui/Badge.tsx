import React from "react";

interface BadgeProps {
  color: string; // e.g. 'green', 'yellow', 'red', 'gray', or a CSS class
  label: string;
  className?: string;
}

export default function Badge({ color, label, className }: BadgeProps) {
  const colorClass =
    color === "green"
      ? "bg-green-100 text-green-700 border-green-400"
      : color === "yellow"
        ? "bg-yellow-100 text-yellow-700 border-yellow-400"
        : color === "red"
          ? "bg-red-100 text-red-700 border-red-400"
          : color === "gray"
            ? "bg-gray-100 text-gray-700 border-gray-400"
            : color;
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full border text-xs font-semibold ${colorClass} ${className || ""}`}
    >
      {label}
    </span>
  );
}
