import { useState, useEffect } from "react";
import CartesianPlane from "../plane/CartesianPlane";
import LabeledPlaneWrapper from "../plane/LabeledPlaneWrapper";

function InputAndPlane({ width, point, setPoint, extraPoints, showingOtherUsers }) {
  const [tempX, setTempX] = useState(point.x.toFixed(2));
  const [tempY, setTempY] = useState(point.y.toFixed(2));

  useEffect(() => {
    setTempX(point.x.toFixed(2));
    setTempY(point.y.toFixed(2));
  }, [point.x, point.y]);

  const handleBlurX = () => {
    const parsed = parseFloat(tempX);
    if (!isNaN(parsed)) {
      const clamped = Math.max(-1, Math.min(1, parsed));
      setPoint((p) => ({ ...p, x: clamped }));
      setTempX(clamped.toFixed(2));
    } else {
      setTempX(point.x.toFixed(2));
    }
  };

  const handleBlurY = () => {
    const parsed = parseFloat(tempY);
    if (!isNaN(parsed)) {
      const clamped = Math.max(-1, Math.min(1, parsed));
      setPoint((p) => ({ ...p, y: clamped }));
      setTempY(clamped.toFixed(2));
    } else {
      setTempY(point.y.toFixed(2));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // triggers handleBlur
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: 600,
        gap: "10px",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <LabeledPlaneWrapper
          width={width}
          height={width}
          xLabelBottom="Valence"
          yLabelLeft="Arousal"
          labelSpacing={12}
        >
          <CartesianPlane
            size={width}
            point={point}
            setPoint={setPoint}
            extraPoints={extraPoints}
            showingOtherUsers={showingOtherUsers}
          />
        </LabeledPlaneWrapper>
      </div>

      {/* Inputs BELOW the entire labeled plane */}
      <div
        style={{
          width: width,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "8px",
          marginBottom: "25px",
          display: "flex",
          gap: "8px",
        }}
      >
        <label style={{ display: "flex", width: "50%", justifyContent: "center", fontSize: 18 }}>
          X:
          <input
            style={{ marginLeft: 10, flex: 1, minWidth: "30px", fontSize: 18 }}
            disabled={showingOtherUsers}
            type="number"
            step="0.01"
            min={-1}
            max={1}
            value={tempX}
            onChange={(e) => setTempX(e.target.value)}
            onBlur={handleBlurX}
            onKeyDown={handleKeyDown}
          />
        </label>

        <label style={{ display: "flex", width: "50%", justifyContent: "center", fontSize: 18 }}>
          Y:
          <input
            style={{ marginLeft: 10, flex: 1, minWidth: "30px", fontSize: 18 }}
            disabled={showingOtherUsers}
            type="number"
            step="0.01"
            min={-1}
            max={1}
            value={tempY}
            onChange={(e) => setTempY(e.target.value)}
            onBlur={handleBlurY}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
    </div>
  );
}

export default InputAndPlane;
