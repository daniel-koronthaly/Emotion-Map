import React, { useState } from "react";

const ExplanationPage = ({ setCurrentPage, isDemographicSubmitted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div>
      <h2>Emotion Classification</h2>
      <p>
        Emotion classification is a difficult subject: different people perceive emotions differently, and cultural factors affect emotion expression and valuation.
      </p>
      <p>
        A simple model for categorizing emotions is the valence-arousal model of emotions:
      </p>
      <ul>
        <li>
          <strong>Valence:</strong> Whether an emotion is positive or negative.
        </li>
        <li>
          <strong>Arousal:</strong> The intensity of an emotion, from calm to excited.
        </li>
      </ul>

      <p>
        Both of these range from -1 to 1. (-1, 0) would mean an emotion is very negative, with neutral energy.<br/>
        (0, 1) would mean an emotion is not negative nor positive, but it's very strong.
      </p>

      <button
        style={{
          backgroundColor: isHovered ? "#00a0b8" : "#008192",
          color: "white",
          width: 200,
          height: 40,
          borderWidth: 0,
          borderRadius: 15,
          fontSize: "14px",
          fontWeight: 600,
          marginTop: "10px",
          transition: "background-color 0.2s, transform 0.1s"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          isDemographicSubmitted ? setCurrentPage("MainPage") : setCurrentPage("Demographics")
        }}
      >
        Next
      </button>
    </div>
  );
};

export default ExplanationPage;
