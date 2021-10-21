import React, { useState, useContext } from 'react';

export const LoanContext = React.createContext();

export const useLoan = () => useContext(LoanContext);

const initialState = [];

// jsx wrapper
export const LoanProvider = (props) => {
  const [loans, setLoans] = useState(initialState);
  console.log(loans);

  const addLoan = (newLoan) => {
    const newLoans = [...loans, newLoan];
    return setLoans(newLoans);
  };

  const updateLoan = (newLoan) => {
    const tempState = loans.filter((loan) => loan._id !== newLoan._id);
    const newState = [...tempState, newLoan];
    return setLoans(newState);
  };

  return (
    <LoanContext.Provider
      value={{ loans, setLoans, addLoan, updateLoan }}
      {...props}
    />
  );
};
