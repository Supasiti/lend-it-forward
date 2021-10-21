import React, { useState, useContext } from 'react';

export const LoanContext = React.createContext();

export const useLoan = () => useContext(LoanContext);

const initialState = [];

// jsx wrapper
export default function OwnLoanProvider(props) {
  const [loans, setLoans] = useState(initialState);

  const addLoan = (newLoan) => {
    const newLoans = [...loans, newLoan];
    return setLoans(newLoans);
  };

  return <LoanContext.Provider value={{ loans, addLoan }} {...props} />;
}
