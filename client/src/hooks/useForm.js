import { useState } from 'react';

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e, key) => {
    const value = e.target.value;
    const newState = { ...formState, [key]: value };
    setFormState(newState);
  };

  const clearForm = () => {
    setFormState(initialState);
  };
  return { formState, handleChange, clearForm };
};

export default useForm;
