import React, { useState, useContext } from 'react';

export const LoanContext = React.createContext();

export const useLoan = () => useContext(LoanContext);

const initialState = {
  own: [],
  borrow: [],
  pending: [],
};

// keep track of all loans
const updateOrAdd = (oldArr, newItem) => {
  const oldItem = oldArr.find((item) => item._id === newItem._id);
  if (oldItem) {
    const result = oldArr.map((item) => {
      if (item._id === newItem._id) {
        return { ...oldItem, ...newItem };
      }
      return item;
    });
    return result;
  } else {
    return [...oldArr, newItem];
  }
};

// jsx wrapper
export const LoanProvider = (props) => {
  const [loans, setGlobalLoans] = useState(initialState);
  const globalLoans = loans;

  // add to loans
  const addLoan = (newLoan, key) => {
    if (!(key in initialState)) {
      throw Error('incorrect key');
    }
    const newState = { ...loans, [key]: [...loans[key], newLoan] };
    return setGlobalLoans(newState);
  };

  // update loan
  const updateLoan = (newLoan, key) => {
    if (!(key in initialState)) {
      throw Error('incorrect key');
    }

    // const tempArr = loans[key].filter((loan) => loan._id !== newLoan._id);
    // const newArr = [...tempArr, newLoan];
    const newArr = updateOrAdd(loans[key], newLoan);
    const newState = { ...loans, [key]: newArr };
    return setGlobalLoans(newState);
  };

  // set loans
  const setLoans = (newLoans, key) => {
    if (!(key in initialState)) {
      throw Error('incorrect key');
    }

    const newState = { ...loans, [key]: newLoans };
    return setGlobalLoans(newState);
  };

  // remove loan
  const removeLoan = (loanId, key) => {
    if (!(key in initialState)) {
      throw Error('incorrect key');
    }
    const tempArr = loans[key].filter((loan) => loan._id !== loanId);
    const newState = { ...loans, [key]: tempArr };
    return setGlobalLoans(newState);
  };

  const clearLoan = () => {
    return setGlobalLoans(initialState);
  };

  return (
    <LoanContext.Provider
      value={{
        globalLoans,
        setLoans,
        addLoan,
        updateLoan,
        removeLoan,
        clearLoan,
      }}
      {...props}
    />
  );
};
