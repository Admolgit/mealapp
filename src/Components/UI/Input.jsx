import React from 'react';
import '../UI/input.css';

const Input = React.forwardRefInput((props, ref) => {
  return (
    <div className="input">
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  )
});

export default Input