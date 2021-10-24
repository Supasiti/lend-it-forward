import { useState } from 'react';

const getValue = (input) => {
  if (input.value) return input.value;
  if ('checked' in input) return input.checked;
  return null;
};

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e, key) => {
    const value = getValue(e.target);
    const newState = { ...formState, [key]: value };
    setFormState(newState);
  };

  const clearForm = () => {
    setFormState(initialState);
  };
  return { formState, handleChange, clearForm, setFormState };
};
