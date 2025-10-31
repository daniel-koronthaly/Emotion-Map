import React, { useState } from "react";
import InputAndPlane from "./InputAndPlane";

const MainPage = ({emotion, onSubmit}) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [extraPoints, setExtraPoints] = useState([]);

  const addCircle = (x, y) => {
    setExtraPoints((prev) => [...prev, { x, y }]);
  };

  const clearCircles = () => {
    setExtraPoints([])
  };

  return (
    <div style={{}}>
      <h2>Main App</h2>
      <InputAndPlane width={600} point={point} setPoint={setPoint} extraPoints={extraPoints} />
      <button style={{width: 600}} onSubmit={() => onSubmit(emotion, point.x, point.y)}>Submit</button>
    </div>
  );
};

export default MainPage;