import React from "react";

export default function Badge({ children, color = "gray" }) {
  const colors = {
    green: { bg: "#d1fae5", text: "#065f46" },
    red: { bg: "#fee2e2", text: "#991b1b" },
    yellow: { bg: "#fef3c7", text: "#92400e" },
    blue: { bg: "#dbeafe", text: "#1e40af" },
    gray: { bg: "#f3f4f6", text: "#374151" },
    teal: { bg: "#ccfbf1", text: "#134e4a" },
  };

  const c = colors[color] || colors.gray;

  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: "2px 10px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.3,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}