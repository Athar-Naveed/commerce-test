import React, { useState } from "react";

const BillingAddress = ({ options, content }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [activeKey, setActiveKey] = useState(0);
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col border rounded-lg">
      {options.map((option, index) => (
        <div
          key={option.value}
          className={`${activeKey === index ? "border border-orange-500" : ""} 
             ${index === 0 ? "rounded-tl-lg rounded-tr-lg" : ""} 
             ${index === 1 ? "rounded-bl-lg rounded-br-lg" : ""} px-2`}>
          <label htmlFor={option.value} className="flex items-center p-2">
            <input
              type="radio"
              id={option.value}
              name="radio-group"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleChange}
              onClick={() => setActiveKey(index)}
              className="mr-2"
            />
            {option.label}
          </label>
          {selectedOption === option.value && content[option.value]}
        </div>
      ))}
    </div>
  );
};

export default BillingAddress;
