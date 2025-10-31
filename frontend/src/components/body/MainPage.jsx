import React, { useState } from "react";
import InputAndPlane from "./InputAndPlane";
import Legend from "../plane/Legend";

const MainPage = ({ emotion, emotionUserList, onSubmit, nextEmotion }) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [extraPoints, setExtraPoints] = useState([]);
  const [legendGenders, setLegendGenders] = useState([]);

  const movePoint = (x, y) => {
    if (!showingOtherUsers) {
      setPoint(x, y)
    }
  }

  const [showingOtherUsers, setShowingOtherUsers] = useState(false)

  function processEmotionData(emotionUserList) {
    const gendersSeen = new Set();

    const points = emotionUserList.map(response => {
      const gender = response.demographic.gender;
      gendersSeen.add(gender);
      return {
        x: response.valence,
        y: response.arousal,
        gender,
        age: response.demographic.age,
      };
    });

    return {
      points,
      genders: Array.from(gendersSeen).sort(),
    };
  }

  const handleClick = () => {
    if (showingOtherUsers) {
      setExtraPoints([])
      setPoint({ x: 0, y: 0 })
      // This timeout is here so that the point has time to animate to the origin
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
        const { points, genders } = processEmotionData(emotionUserList);
        setExtraPoints(points);
        setLegendGenders(genders);
      }
      setShowingOtherUsers(true)
    }
  }

  return (
    <div>
      <h2>Main App</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "fit-content",
        }}
      >

        {/* Row: plane+button together, Legend to the right */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3>{emotion}</h3>
            <InputAndPlane
              width={500}
              point={point}
              setPoint={movePoint}
              extraPoints={extraPoints}
              showingOtherUsers={showingOtherUsers}
            />
            <button style={{
              backgroundColor: showingOtherUsers ? "#506b6eff": "#008192",
              color: "white",
              width: 500,
              height: 40,
              borderWidth: 0,
              borderRadius: 15,
              fontSize: "14px",
              fontWeight: 600,
              marginTop: "10px"
            }} onClick={handleClick}>
              {showingOtherUsers ? "Next Emotion" : "Submit"}
            </button>
          </div>
          <Legend legendGenders={["You", ...legendGenders]} showingOtherUsers={showingOtherUsers} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;