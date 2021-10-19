import { useState } from 'react';

const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e, key) => {
    const value = e.target.value;
    const newState = { ...formState, [key]: value };
    setFormState(newState);
  };

  return { formState, handleChange };
};

export default useForm;
