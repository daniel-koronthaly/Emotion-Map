import CartesianPlane from "../plane/CartesianPlane";
import LabeledPlaneWrapper from "../plane/LabeledPlaneWrapper";
import { useState } from "react";

function InputAndPlane({ width }) {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [extraPoints, setExtraPoints] = useState([]);

  const addCircle = (x, y) => {
    setExtraPoints((prev) => [...prev, { x, y }]);
  };

  const clearCircles = () => {
    setExtraPoints([])
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 600,
      gap: '10px',
    }}>
      <button
        style={{ width: width, height: "50px" }}
        onClick={() => addCircle(Math.random() * 2 - 1, Math.random() * 2 - 1)}
      >
        Add Random Circle
      </button>
      <button
        style={{ width: width, height: "50px" }}
        onClick={clearCircles}
      >
        Clear Circles
      </button>
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
          />
        </LabeledPlaneWrapper>
      </div>
      {/* Inputs BELOW the entire labeled plane */}
      <div style={{ width: width, alignItems: 'center', justifyContent: 'center', marginTop: "20px", display: "flex", gap: "8px" }}>
        <label style={{ display: 'flex', width: "50%",  justifyContent: 'center' }}>
          X:
          <input
            style={{ marginLeft: 10, flex: 1, minWidth: "30px" }}
            type="number"
            step="0.01"
            value={point.x.toFixed(2)}
            onChange={(e) => setPoint((p) => ({ ...p, x: parseFloat(e.target.value) }))}
          />
        </label>
        <label style={{ display: 'flex', width: "50%",  justifyContent: 'center' }}>
          Y:
          <input
            style={{ marginLeft: 10, flex: 1, minWidth: "30px" }}
            type="number"
            step="0.01"
            value={point.y.toFixed(2)}
            onChange={(e) => setPoint((p) => ({ ...p, y: parseFloat(e.target.value) }))}
          />
        </label>

      </div>
    </div>
  );
}

export default InputAndPlane