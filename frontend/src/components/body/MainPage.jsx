import React, { useState } from "react";
import InputAndPlane from "./InputAndPlane";

const MainPage = ({ emotion, emotionUserList, onSubmit, nextEmotion }) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [extraPoints, setExtraPoints] = useState([]);

  const movePoint = (x, y) => {
    if (!showingOtherUsers) {
      setPoint(x, y)
    }
  }

  const [showingOtherUsers, setShowingOtherUsers] = useState(false)

  const handleClick = () => {
    if (showingOtherUsers) {
      setExtraPoints([])
      setPoint({ x: 0, y: 0 })
      setTimeout(() => {
        nextEmotion();
        setShowingOtherUsers(false);
      }, 200);
    } else {
      onSubmit(emotion, point.x, point.y)
      if (emotionUserList.length === 0) {
        console.log("Emotion user list is empty")
      }
      else {
        const points = emotionUserList.map((response) => ({
          x: response.valence,
          y: response.arousal,
          gender: response.demographic.gender,
          age: response.demographic.age
        }));
        setExtraPoints(points);
      }
      setShowingOtherUsers(true)
    }
  }

  return (
    <div style={{}}>
      <h2>Main App</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content"
        }}
      >
        <h3>{emotion}</h3>
        <InputAndPlane
          width={500}
          point={point}
          setPoint={movePoint}
          extraPoints={extraPoints}
          showingOtherUsers={showingOtherUsers}
        />
        <button style={{ width: 500, marginTop: "10px" }} onClick={handleClick}>
          {showingOtherUsers ? "Next Emotion" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MainPage;