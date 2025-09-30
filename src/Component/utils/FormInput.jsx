import React from "react";

const FormInput = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  min, 
  className = "" 
}) => {
  return (
    <div className="mb-3">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className={`border p-2 w-full rounded ${className}`}
      />
    </div>
  );
};

export default FormInput;
