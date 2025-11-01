import React, { useState } from "react";
import { AgeOptions, GenderOptions, SexualityOptions, TransgenderOptions } from "../helpers/DemographicOptions";
import { MdInfoOutline } from "react-icons/md";

const DemographicsForm = ({ onSubmit }) => {
  const [age, setAge] = useState("Prefer not to answer");
  const [sexuality, setSexuality] = useState("Prefer not to answer");
  const [gender, setGender] = useState("Prefer not to answer");
  const [transgender, setTransgender] = useState("Prefer not to answer");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(age, gender, sexuality, transgender);
  };

  const renderRadioGroup = (label, value, setValue, options) => (
    <div className="">
      <p className="">{label}</p>
      <div className="">
        {options.map((opt) => (
          <label key={opt} className="" style={{ display: "block", marginBottom: "4px" }}>
            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => setValue(opt)}
              className=""
            />{" "}
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  return (
    <>
      <div style={{alignItems: "center", display: 'flex', flexDirection: 'row', marginBottom: -20}}>
        <h2 className="">Tell us about yourself</h2>
        <a
          href="https://github.com/daniel-koronthaly/#data-privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          title="View our data privacy policy"
          style={{
            fontSize: "14px",
            color: "#00a0b8",
            textDecoration: "none",
            marginLeft: "8px",
          }}
        >
          <MdInfoOutline size={20} />
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        {renderRadioGroup("Age", age, setAge, AgeOptions)}
        {renderRadioGroup("Gender", gender, setGender, GenderOptions)}
        {renderRadioGroup("Transgender?", transgender, setTransgender, TransgenderOptions)}
        {renderRadioGroup("Sexuality", sexuality, setSexuality, SexualityOptions)}

        <button type="submit" className=""
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
        >
          Submit
        </button>

      </form>
    </>
  );
};

export default DemographicsForm;
