import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
  label: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  title?: string;
  color?: string;
  width?: number;
  height?: number;
}

export default function BarChart({
  data,
  title,
  color = "#4e8ef7",
  width = 520,
  height = 280,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null); // ✅ typed ref

  const margin = { top: 30, right: 20, bottom: 40, left: 45 };
  const chartW = width - margin.left - margin.right;
  const chartH = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartW])
      .padding(0.4);

    const y = d3
      .scaleLinear()
      .domain([0, (d3.max(data, (d) => d.value) ?? 0) * 1.15]) // ✅ nullish coalescing, bukan * langsung
      .range([chartH, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-chartW)
          .tickFormat(() => ""), // ✅ function, bukan string kosong
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "#e5e7eb")
          .attr("stroke-width", 1),
      );

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${chartH})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call((g) => g.select(".domain").attr("stroke", "#9ca3af"))
      .call((g) =>
        g
          .selectAll("text")
          .attr("font-size", 11)
          .attr("fill", "#374151")
          .attr("font-family", "sans-serif"),
      );

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .call((g) =>
        g
          .selectAll("text")
          .attr("font-size", 10)
          .attr("fill", "#6b7280")
          .attr("font-family", "sans-serif"),
      );

    // Bars
    g.selectAll<SVGRectElement, DataPoint>(".bar") // ✅ generic type
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label) ?? 0) // ✅ fallback 0 karena scaleBand bisa undefined
      .attr("width", x.bandwidth())
      .attr("y", chartH)
      .attr("height", 0)
      .attr("fill", color)
      .transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => chartH - y(d.value));

    // Value labels
    g.selectAll<SVGTextElement, DataPoint>(".label") // ✅ generic type
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => (x(d.label) ?? 0) + x.bandwidth() / 2) // ✅ fallback 0
      .attr("y", (d) => y(d.value) - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", 11)
      .attr("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .attr("fill", color)
      .attr("opacity", 0)
      .text((d) => d.value)
      .transition()
      .delay(400)
      .duration(300)
      .attr("opacity", 1);

    // Title
    if (title) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 18)
        .attr("text-anchor", "middle")
        .attr("font-size", 13)
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("fill", "#374151")
        .text(title);
    }
  }, [data, title, color, width, height]);

  return <svg ref={svgRef} />;
}
