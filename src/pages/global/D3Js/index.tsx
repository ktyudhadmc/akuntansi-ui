import { useState } from "react";
import BarChart from "./BarChart";

interface DataPoint {
  label: string;
  value: number;
}

export default function D3Js() {
  const defaultData: DataPoint[] = [
    { label: "MTK", value: 85 },
    { label: "IND", value: 90 },
    { label: "ING", value: 78 },
    { label: "IPA", value: 92 },
    { label: "IPS", value: 88 },
  ];

  const [data, setData] = useState<DataPoint[]>(defaultData);
  const [title, setTitle] = useState("Rekap Nilai - Budi Santoso");
  const [color, setColor] = useState("#4e8ef7");

  const updateValue = (index: number, value: string) => {
    setData((prev) =>
      prev.map((d, i) => (i === index ? { ...d, value: Number(value) } : d)),
    );
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 24,
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: 16, color: "#111", marginBottom: 16 }}>
        D3.js Bar Chart — React Demo
      </h2>

      {/* Chart */}
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
          display: "inline-block",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          marginBottom: 24,
        }}
      >
        <BarChart data={data} title={title} color={color} />
      </div>

      {/* Controls */}
      <div
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          maxWidth: 520,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: "#6b7280" }}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginTop: 4,
              padding: "6px 8px",
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              fontSize: 12,
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, color: "#6b7280" }}>Warna Bar</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              display: "block",
              marginTop: 4,
              height: 32,
              width: 60,
              border: "none",
              cursor: "pointer",
            }}
          />
        </div>

        <label style={{ fontSize: 12, color: "#6b7280" }}>
          Nilai per Mata Pelajaran
        </label>
        {data.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <span style={{ width: 40, fontSize: 12, color: "#374151" }}>
              {d.label}
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={d.value}
              onChange={(e) => updateValue(i, e.target.value)}
              style={{ flex: 1 }}
            />
            <span
              style={{ width: 28, fontSize: 12, fontWeight: "bold", color }}
            >
              {d.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
