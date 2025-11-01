import React, { useState } from "react";
import InputAndPlane from "./InputAndPlane";
import Legend from "../plane/Legend";
import { AnimatedText } from "../helpers/AnimatedText";

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

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const baseColor = showingOtherUsers ? "#506b6e" : "#008192";
  const hoverColor = showingOtherUsers ? "#688b8e" : "#00a0b8";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* This is the centered content wrapper */}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {/* Plane + button column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Current emotion:{" "}
            <span
              style={{
                display: "inline-block",
                minWidth: "120px",
                verticalAlign: "baseline",
                fontSize: 40
              }}
            >
              <AnimatedText
                style={{ display: "inline-block" }}
              >
                {emotion}
              </AnimatedText>
            </span>
          </h2>
          <AnimatedText flag={showingOtherUsers} delay={0.2}>{!showingOtherUsers
            ? "Click and drag the red point to where you think this emotion belongs!"
            : "This is what other users said!"}
          </AnimatedText>
          <InputAndPlane
            width={500}
            point={point}
            setPoint={movePoint}
            extraPoints={extraPoints}
            showingOtherUsers={showingOtherUsers}
          />
          <button
            style={{
              backgroundColor: isHovered ? hoverColor : baseColor,
              color: "white",
              width: 500,
              height: 40,
              borderWidth: 0,
              borderRadius: 15,
              fontSize: "14px",
              fontWeight: 600,
              transition: "background-color 0.2s, transform 0.1s"
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            {showingOtherUsers ? "Next Emotion" : "Submit"}
          </button>
        </div>

        {/* Legend: positioned directly to the right of the above block */}
        <div
          style={{
            position: "absolute",
            left: "100%",
            marginLeft: "30px",
            top: "31%",
            transform: "translateY(-50%)",
          }}
        >
          <Legend
            legendGenders={["You", ...legendGenders]}
            showingOtherUsers={showingOtherUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;