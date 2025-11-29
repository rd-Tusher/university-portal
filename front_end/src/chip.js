import React, { useState } from "react";
import { courseMetaData } from "./Components/KeyValueObject";

function ChipInput({ courseData,handleChange,classDay }) {
  const [chips, setChips] = useState([]);
  const [input, setInput] = useState("");

  const handleKey = (e) => {
    if (e.key === "Enter" && input.trim("")) {
      if (!chips.includes(input.trim())) {
        setChips([...chips, input.trim()]);
        handleChange(e);
        // handleChange(classDay,[...chips,input.trim()]);
      }
      setInput("");
    }
  };

  const removeChip = (toRemove) => {
    setChips(chips.filter((chip) => chip !== toRemove));
  };

  return (
    <>
      <div className="mt-2">
        <input
          name="day"
          type="text"
          className="form-control"
          placeholder="e.g. Saturday"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleKey(e)}
        />
      </div>
      {chips && chips.length > 0 && (
        <div className="d-flex flex-wrap align-items-center gap-1">
          {chips.map((chip, i) => (
            <div key={i} className="d-flex mb-2 border-primary  mt-3 gap-3">
              <span className="chip-in fs-8">
                {chip.charAt(0).toUpperCase() + chip.slice(1)}
                <span className="pointer" onClick={() => removeChip(chip)}>
                  &times;
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ChipInput;
