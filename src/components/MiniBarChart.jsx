import React from "react";

export default function MiniBarChart({ data = [], labels = [] }) {
  const maxValue = Math.max(...data);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 80,
        padding: 10,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
      }}
    >
      {data.map((value, index) => {
        const height = (value / maxValue) * 70;

        return (
          <div key={index} style={{ textAlign: "center" }}>
            {/* BAR */}
            <div
              style={{
                width: 10,
                height: `${height}px`,
                background: "#1a1a2e",
                borderRadius: 4,
                marginBottom: 4,
                transition: "0.3s",
              }}
            ></div>

            {/* LABEL */}
            <span style={{ fontSize: 10, color: "#6b7280" }}>
              {labels[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}