import CartesianPlane from "../plane/CartesianPlane";
import LabeledPlaneWrapper from "../plane/LabeledPlaneWrapper";

function InputAndPlane({ width, point, setPoint, extraPoints, showingOtherUsers }) {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 600,
      gap: '10px',
    }}>

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
      <div style={{ width: width, alignItems: 'center', justifyContent: 'center', marginTop: "20px", display: "flex", gap: "8px" }}>
        <label style={{ display: 'flex', width: "50%",  justifyContent: 'center' }}>
          X:
          <input
            style={{ marginLeft: 10, flex: 1, minWidth: "30px" }}
            disabled={showingOtherUsers}
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
            disabled={showingOtherUsers}
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