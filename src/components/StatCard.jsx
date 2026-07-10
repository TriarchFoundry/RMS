import React from "react";

export default function StatCard({
  title,
  value,
  icon,
  change,
  color = "#1a1a2e",
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 200,
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
          {title}
        </p>

        <h2 style={{ margin: "6px 0", fontSize: 22, color }}>
          {value}
        </h2>

        {change && (
          <span
            style={{
              fontSize: 12,
              color: change.startsWith("+") ? "#10b981" : "#ef4444",
              fontWeight: 500,
            }}
          >
            {change}
          </span>
        )}
      </div>

      {/* RIGHT SIDE ICON */}
      <div style={{ fontSize: 26 }}>{icon}</div>
    </div>
  );
}