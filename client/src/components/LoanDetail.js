import { Center, Spinner } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { spinnerProps } from '../staticProps/spinner';
import { GET_LOAN } from '../gql/loans';
import UnavailableLoanDetail from './UnavailableLoanDetail';
import AvailableLoanDetail from './AvailableLoanDetail';

const initialState = {
  title: '',
  description: '',
  category: '',
  status: 'unavailable',
  owner: null,
  holder: null,
  reservedfor: null,
};

// render
const LoanDetail = ({ loanId }) => {
  const { data, loading } = useQuery(GET_LOAN, { variables: { id: loanId } });
  const [loan, setLoan] = useState(initialState);

  // update loan
  useEffect(() => {
    if (data?.loan) {
      setLoan(data.loan);
    }
  }, [data]);

  // handle when the new loan is updated
  const handleLoanUpdate = (updatedData) => {
    const newLoan = { ...loan, ...updatedData };
    setLoan(newLoan);
  };

  // spinning wheel on loading
  if (loading) {
    return (
      <Center minH="64">
        <Spinner {...spinnerProps} />
      </Center>
    );
  }

  if (loan.status === 'available') {
    return <AvailableLoanDetail loan={loan} onLoanUpdated={handleLoanUpdate} />;
  }

  // if (loan.status === 'reserved') {
  //   return <ReservedLoanDetail loan={loan} onLoanUpdated={handleLoanUpdate} />;
  // }

  return <UnavailableLoanDetail loan={loan} onLoanUpdated={handleLoanUpdate} />;
};

export default LoanDetail;
