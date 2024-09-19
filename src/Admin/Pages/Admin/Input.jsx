import React from 'react';

function Input({ id, title, type, name, handleData, customClasses, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{title}</label>
      <input 
        type={type} 
        name={name} 
        className={`form-control ${customClasses} ${error ? 'is-invalid' : ''}`} 
        id={id} 
        onChange={handleData}
      />
      {error && <div className="invalid-feedback">{error}</div>} 
    </div>
  );
}

export default Input;
