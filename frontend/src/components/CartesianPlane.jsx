import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Small component to render a blue point with smooth ease-in/out glow
const BluePoint = ({ x, y, size = 5, glowColor = "rgba(0,0,255,0.6)" }) => {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="blue"
      stroke={glowColor}
      strokeWidth={0}
      initial={{ r: 0, opacity: 0, strokeWidth: 0 }}
      animate={{ r: size, opacity: 1, strokeWidth: [0, 15, 0] }}
      exit={{ r: 0, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
};

const CartesianPlane = ({ size = 400, initialPoint = { x: 0, y: 0 }, extraPoints = [] }) => {
  const [point, setPoint] = useState(initialPoint);
  const [isDraggingRed, setIsDraggingRed] = useState(false);
  const svgRef = useRef(null);

  // Convert SVG coordinates to Cartesian [-1,1]
  const svgToCartesian = (svgX, svgY) => {
    const x = (svgX / size) * 2 - 1;
    const y = -((svgY / size) * 2 - 1);
    return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  // Convert Cartesian [-1,1] to SVG coordinates
  const cartesianToSvg = (x, y) => ({
    svgX: ((x + 1) / 2) * size,
    svgY: ((1 - y) / 2) * size,
  });

  const startDragging = (e) => {
    if (e.button !== 0) return; // left-click only

    setIsDraggingRed(true);

    const handleMouseMove = (moveEvent) => {
      const rect = svgRef.current.getBoundingClientRect();
      const svgX = moveEvent.clientX - rect.left;
      const svgY = moveEvent.clientY - rect.top;
      setPoint(svgToCartesian(svgX, svgY));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setIsDraggingRed(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Immediate move for first click
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    setPoint(svgToCartesian(svgX, svgY));
  };

  const preventContextMenu = (e) => e.preventDefault();
  const preventRightClick = (e) => { if (e.button === 2) e.preventDefault(); };

  const { svgX, svgY } = cartesianToSvg(point.x, point.y);

  return (
    <div
      onContextMenu={preventContextMenu}
      onMouseDown={preventRightClick}
      style={{ userSelect: "none" }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        style={{ border: "1px solid black", cursor: isDraggingRed ? "grabbing" : "default" }}
        onMouseDown={startDragging}
      >
        {/* Axes */}
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="gray" />
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="gray" />

        {/* Red draggable point */}
        <motion.circle
          cx={svgX}
          cy={svgY}
          fill="red"
          r={5}
          animate={{ r: isDraggingRed ? 10 : 5 }}
          transition={{ duration: 0.2 }}
          stroke={isDraggingRed ? "rgba(255,0,0,0.6)" : ""}
          strokeWidth={isDraggingRed ? 15 : 0}
        />

        {/* Extra blue points with smooth glow */}
        <AnimatePresence>
          {extraPoints.map((p, i) => {
            const { svgX: x, svgY: y } = cartesianToSvg(p.x, p.y);
            return <BluePoint key={i} x={x} y={y} />;
          })}
        </AnimatePresence>
      </svg>

      {/* Inputs for main point */}
      <div style={{ marginTop: "10px" }}>
        <label>
          X:{" "}
          <input
            type="number"
            step="0.01"
            value={point.x}
            min={-1}
            max={1}
            onChange={(e) =>
              setPoint((prev) => ({ ...prev, x: parseFloat(e.target.value) }))
            }
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Y:{" "}
          <input
            type="number"
            step="0.01"
            value={point.y}
            min={-1}
            max={1}
            onChange={(e) =>
              setPoint((prev) => ({ ...prev, y: parseFloat(e.target.value) }))
            }
          />
        </label>
      </div>
    </div>
  );
};

export default CartesianPlane;
