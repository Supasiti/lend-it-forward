import { Center, Spinner, VStack, Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { spinnerProps } from '../staticProps/spinner';
import { GET_LOAN } from '../gql/loans';
import { cardProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';
import LoanDescription from './LoanDescription';
import JoinLoanWaitList from './JoinLoanWaitList';
import { useLogging } from '../dependecies/LoggingContext';

const initialState = {
  title: '',
  description: '',
  category: '',
  status: 'unavailable',
  owner: null,
  holder: null,
  reservedFor: null,
};

const isReservedFor = (loan, userId) => {
  if (loan && !!loan.reservedFor) {
    console.log(loan.reservedFor.user._id, userId);
  }
  return loan && !!loan.reservedFor && loan.reservedFor.user._id === userId;
};

// render
const BorrowerLoanDetail = ({ loanId }) => {
  const { data, loading } = useQuery(GET_LOAN, { variables: { id: loanId } });
  const [loan, setLoan] = useState(initialState);
  const { logging } = useLogging();

  // console.log(logging.user?._id);
  // console.log(loan?.reservedFor?._id);
  console.log(isReservedFor(loan, logging.user._id));

  // update loan
  useEffect(() => {
    if (data?.loan) {
      setLoan(data.loan);
    }
  }, [data]);

  // spinning wheel on loading
  if (loading) {
    return (
      <Center minH="64">
        <Spinner {...spinnerProps} />
      </Center>
    );
  }

  return (
    <VStack spacing="6">
      {['reserved']}
      <Box {...cardProps}>
        <Flex wrap="wrap" justify="center">
          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <Box {...squareProps}>
              <div> image here</div>
            </Box>
          </Box>

          <Box flexBasis="0 0" w={{ base: '100%', md: '50%' }} p="4">
            <LoanDescription loan={loan} />
          </Box>
        </Flex>
      </Box>

      <Box {...cardProps} py="4">
        <JoinLoanWaitList loan={loan} />
      </Box>
    </VStack>
  );
};

export default BorrowerLoanDetail;
