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

  const genderToColor = {
    "Male": "#2761F5",
    "Female": "#d45fdf",
    "Nonbinary / Gender diverse": "#fff200ff",
    "Prefer not to answer": "#7e828cff"
  }

  const handleClick = () => {
    if (showingOtherUsers) {
      setExtraPoints([])
      nextEmotion()
      setShowingOtherUsers(false)
    } else {
      onSubmit(emotion, point.x, point.y)
      if (emotionUserList.length === 0) {
        console.log("Emotion user list is empty")
      }
      else {
        const points = emotionUserList.map((response) => ({
          x: response.valence,
          y: response.arousal,
          color: genderToColor[response.demographic.gender]
        }));
        setExtraPoints(points);
      }
      setShowingOtherUsers(true)
    }
  }

  return (
    <div style={{}}>
      <h2>Main App</h2>
      <InputAndPlane width={600} point={point} setPoint={movePoint} extraPoints={extraPoints} showingOtherUsers={showingOtherUsers}/>
      <button style={{ width: 600 }} onClick={handleClick}>Submit</button>
    </div>
  );
};

export default MainPage;