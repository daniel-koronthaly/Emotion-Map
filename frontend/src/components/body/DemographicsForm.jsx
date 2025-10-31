import React, { useState } from "react";

// Enum-like options
const AgeOptions = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55–64",
  "65 or older",
  "Prefer not to answer",
];

const SexualityOptions = [
  "Asexual",
  "Bisexual",
  "Gay or Lesbian",
  "Heterosexual / Straight",
  "Pansexual",
  "Prefer not to answer",
];

const GenderOptions = [
  "Male",
  "Female",
  "Nonbinary / Gender diverse",
  "Prefer not to answer",
];

const TransgenderOptions = [
  "Yes",
  "No",
  "Prefer not to answer",
];

const DemographicsForm = ({ onSubmit }) => {
  const [age, setAge] = useState("Prefer not to answer");
  const [sexuality, setSexuality] = useState("Prefer not to answer");
  const [gender, setGender] = useState("Prefer not to answer");
  const [transgender, setTransgender] = useState("Prefer not to answer");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ age, gender, sexuality, transgender });
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

      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};

export default DemographicsForm;
