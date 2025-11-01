import React, { useState } from "react";

const WelcomePage = ({ setCurrentPage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This website is intended for you to see if your classification of emotions is similar to other people,
        and if it's linked to some basic demographic info.</p>
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
        onClick={() => setCurrentPage("Explanation")}
      >
        Next
      </button>
    </div>
  );
};

export default WelcomePage;