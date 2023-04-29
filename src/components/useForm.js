import React, { useState } from 'react';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    if (validateOnChange)
      validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}

export function Form(props) {
  const { children, ...other } = props;

  const formStyle = {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: '1rem'
    }
  };

  return (
    <form style={formStyle} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
