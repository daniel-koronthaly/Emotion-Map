import React, { useState } from "react";
import { AgeOptions, GenderOptions, SexualityOptions, TransgenderOptions } from "../helpers/DemographicOptions";

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

  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="">Tell us about yourself</h2>

      {renderRadioGroup("Age", age, setAge, AgeOptions)}
      {renderRadioGroup("Gender", gender, setGender, GenderOptions)}
      {renderRadioGroup("Transgender?", transgender, setTransgender, TransgenderOptions)}
      {renderRadioGroup("Sexuality", sexuality, setSexuality, SexualityOptions)}

      <button type="submit" className=""
        style={{
          backgroundColor: "#008192",
          color: "white",
          width: 200,
          height: 40,
          borderWidth: 0,
          borderRadius: 15,
          fontSize: "14px",
          fontWeight: 600,
          marginTop: "10px"
        }}>
        Submit
      </button>
    </form>
  );
};

export default DemographicsForm;
