import CartesianPlane from "./components/CartesianPlane";
import { useState } from "react";

function App() {
  const [extraPoints, setExtraPoints] = useState([]);

  const addCircle = (x, y) => {
    setExtraPoints((prev) => [...prev, { x, y }]);
  };

  const clearCircles = () => {
    setExtraPoints([])
  }

  return (
    <div>
      <button onClick={() => addCircle(Math.random() * 2 - 1, Math.random() * 2 - 1)}>
        Add Random Circle
      </button>
      <button onClick={clearCircles}>
        Clear Circles
      </button>
      <CartesianPlane size={400} extraPoints={extraPoints} />
    </div>
  );
}

export default App