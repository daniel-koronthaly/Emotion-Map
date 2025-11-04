import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genderToColor } from "../helpers/GenderToColor";

// Small component to render a point with smooth ease-in/out glow
const Point = ({ x, y, size = 7, gender, age }) => {
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
    <>
      {/* Colored circle with glow */}
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
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      {/* Persistent black border circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill="transparent"
        stroke="black"
        strokeWidth={1.2}
        initial={{ r: 0, opacity: 0, strokeWidth: 0 }}
        animate={{ r: size, opacity: 1, strokeWidth: [0, 1.2] }}
        exit={{ r: 0, opacity: 0 }}
      />
    </>
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
    if (!e.touches && e.button !== 0) return;

    setIsDraggingRed(true);

    const getClientXY = (event) => {
      if (event.touches && event.touches.length > 0) {
        return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
      } else {
        return { clientX: event.clientX, clientY: event.clientY };
      }
    };

    const handleMove = (moveEvent) => {
      moveEvent.preventDefault(); // prevent scrolling
      const rect = svgRef.current.getBoundingClientRect();
      const { clientX, clientY } = getClientXY(moveEvent);
      const svgX = clientX - rect.left;
      const svgY = clientY - rect.top;
      setPoint(svgToCartesian(svgX, svgY));
    };

    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      setIsDraggingRed(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleEnd);

    // Immediate move for first click/tap
    const rect = svgRef.current.getBoundingClientRect();
    const { clientX, clientY } = getClientXY(e);
    const svgX = clientX - rect.left;
    const svgY = clientY - rect.top;
    setPoint(svgToCartesian(svgX, svgY));
  };

  const preventContextMenu = (e) => e.preventDefault();
  const preventRightClick = (e) => { if (e.button === 2) e.preventDefault(); };

  const { svgX, svgY } = cartesianToSvg(point.x, point.y);

  return (
    <div
      onContextMenu={preventContextMenu}
      onMouseDown={preventRightClick}
      style={{ userSelect: "none", width: "90%", maxWidth: 500, aspectRatio: "1 / 1" }}
    >
      <svg
        ref={svgRef}
        width={size}
        height={size}
        style={{
          border: "2px solid white",
          backgroundColor: '#1b1d22ff',
          touchAction: "none",
          cursor: isDraggingRed ? "grabbing" : "default"
        }}
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      >
        {/* Axes */}
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="#b6bccaff" />
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="#b6bccaff" />

        {/* Extra points with smooth glow */}
        <AnimatePresence>
          {extraPoints.map((p, i) => {
            const { svgX: x, svgY: y } = cartesianToSvg(p.x, p.y);
            return <Point key={i} x={x} y={y} gender={p.gender} age={p.age} />;
          })}
        </AnimatePresence>

        {/* Red draggable point with persistent black border */}
        <>
          {/* Glow */}
          <motion.circle
            cx={svgX ?? 0}
            cy={svgY ?? 0}
            r={isDraggingRed ? 10 : 7}
            fill="red"
            stroke={isDraggingRed ? "rgba(255,0,0,0.6)" : "transparent"}
            strokeWidth={isDraggingRed ? 15 : 0}
            initial={{ r: 0, opacity: 0, cx: 0, cy: 0 }}
            animate={{
              r: isDraggingRed ? 10 : 7,
              opacity: 1,
              cx: svgX ?? 0,
              cy: svgY ?? 0,
            }}
            exit={{ r: 0, opacity: 0 }}
            transition={{
              r: { type: "spring", stiffness: 200, damping: 20 },
              cx: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
              cy: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
              opacity: { duration: 0.3 },
            }}
          />
          {/* Black border circle */}
          <motion.circle
            cx={svgX ?? 0}
            cy={svgY ?? 0}
            r={isDraggingRed ? 10 : 7}
            fill="transparent"
            stroke="black"
            strokeWidth={1.2}
            initial={{ r: 0, opacity: 0, cx: 0, cy: 0 }}
            animate={{
              r: isDraggingRed ? 10 : 7,
              cx: svgX ?? 0,
              cy: svgY ?? 0,
            }}
            transition={{
              r: { type: "spring", stiffness: 200, damping: 20 },
              cx: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
              cy: showingOtherUsers ? { type: "spring", stiffness: 200, damping: 20 } : { duration: 0 },
            }}
          />
        </>
      </svg>
    </div>
  );
};

export default CartesianPlane;
