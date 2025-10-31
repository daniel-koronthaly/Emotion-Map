import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const genderToColor = {
  "Male": "#2761F5",
  "Female": "#d45fdf",
  "Nonbinary / Gender diverse": "#fff200ff",
  "Prefer not to answer": "#7e828cff"
}

// Small component to render a point with smooth ease-in/out glow
const Point = ({ x, y, size = 5, gender, age }) => {
  function hexToRgba(hex, alpha = 0.6) {
    let sanitized = hex.replace("#", "");
    if (sanitized.length === 3) {
      // expand shorthand like "f00" => "ff0000"
      sanitized = sanitized.split("").map(c => c + c).join("");
    }
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  const color = genderToColor[gender]
  const glowColor = hexToRgba(color, 0.6);
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      stroke={glowColor}
      strokeWidth={0}
      initial={{ r: 0, opacity: 0, strokeWidth: 0 }}
      animate={{ r: size, opacity: 1, strokeWidth: [0, 15, 0] }}
      exit={{ r: 0, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  );
};

const CartesianPlane = ({ size = 400, point, setPoint, extraPoints = [], showingOtherUsers }) => {
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
    if (showingOtherUsers) return; // Don't allow dragging if we're showing other users.
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

        {/* Extra points with smooth glow */}
        <AnimatePresence>
          {extraPoints.map((p, i) => {
            const { svgX: x, svgY: y } = cartesianToSvg(p.x, p.y);
            return <Point key={i} x={x} y={y} gender={p.gender} age={p.age} />;
          })}
        </AnimatePresence>

        {/* Red draggable point */}
        <motion.circle
          fill="red"
          stroke={isDraggingRed ? "rgba(255,0,0,0.6)" : ""}
          strokeWidth={isDraggingRed ? 15 : 0}
          initial={{ r: 5 }}
          animate={{
            r: isDraggingRed ? 10 : 5,
            cx: svgX,
            cy: svgY,
          }}
          transition={{
            r: { type: "spring", stiffness: 200, damping: 20 },
            cx: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
            cy: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
          }}
        />


      </svg>
    </div>
  );
};

export default CartesianPlane;
