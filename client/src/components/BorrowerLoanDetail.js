import {
  Center,
  Spinner,
  VStack,
  Box,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { spinnerProps } from '../staticProps/spinner';
import { GET_LOAN } from '../gql/loans';
import { cardProps } from '../staticProps/card';
import LoanDescription from './LoanDescription';
import JoinLoanWaitList from './JoinLoanWaitList';
import { useLogging } from '../dependencies/LoggingContext';
import { helperProps } from './Input';
import { useGetWaitList } from '../hooks/useGetWaitList';
import LeaveWaitList from './LeaveWaitList';
import Square from './Square';

const initialState = {
  title: '',
  description: '',
  category: '',
  status: 'unavailable',
  owner: null,
  holder: null,
  reservedFor: null,
};

// if the loan is status is 'reserved' for this user
const isReservedFor = (loan, userId) => {
  const isReserved = loan?.status === 'reserved';
  const forThisUser = loan?.reservedFor?.user?._id === userId;
  return loan && isReserved && forThisUser;
};

// render
const BorrowerLoanDetail = ({ loanId }) => {
  const [loan, setLoan] = useState(initialState);
  const [queuer, setQueuer] = useState(null);
  const { data, loading } = useQuery(GET_LOAN, { variables: { id: loanId } });
  const { logging } = useLogging();
  const { waitList, getWaitList } = useGetWaitList();

  // update on queuer
  useEffect(() => {
    if (waitList.length) {
      setQueuer(waitList[0]);
    }
  }, [waitList]);

  // check if user is in a waiting list
  useEffect(() => {
    if (logging.isLoggedIn && !queuer) {
      getWaitList({ loan: loanId, user: logging.user._id });
    }
  }, [logging]);

  // update loan
  useEffect(() => {
    if (data?.loan) {
      setLoan(data.loan);
    }
  }, [data]);

  // handle when user join a waiting list
  const handleJoinWaitList = (newQueuer) => {
    setQueuer(newQueuer);
  };

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
      {/* message */}
      {isReservedFor(loan, logging.user._id) && (
        <Box {...cardProps} p="4">
          <Text fontSize="3xl" color="peel">
            Congratulation!
          </Text>
          <Text {...helperProps} mt="3">
            The item below have been reserved for you! There is no need for you
            to do anything. The owner will contact you. In the meantime, if you
            want to update your contact details, can you do so below.
          </Text>
        </Box>
      )}

      {/* show when you have the item */}
      {loan.status === 'onLoan' && (
        <Box {...cardProps} p="4">
          <Text fontSize="3xl" color="peel">
            Please Enjoy the Use of This Item!
          </Text>
          <Text {...helperProps} mt="3">
            Now that you have the item, please enjoy it responsibly.
          </Text>
        </Box>
      )}

      {/* show when you have joined the waiting list but is not reserved for you */}
      {queuer && !queuer.selected && (
        <Box {...cardProps} py="4">
          <LeaveWaitList queuer={queuer} />
        </Box>
      )}

      {/* Item info */}
      <Box {...cardProps}>
        <Flex wrap="wrap" justify="center">
          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <Square>
              {loan?.imageUrl && (
                <Image h="100%" objectFit="cover" src={loan.imageUrl} />
              )}
            </Square>
          </Box>

          <Box flexBasis="0 0" w={{ base: '100%', md: '50%' }} p="4">
            <LoanDescription loan={loan} />
          </Box>
        </Flex>
      </Box>

      {/* for contact */}
      <Box {...cardProps} py="4">
        <JoinLoanWaitList
          loan={loan}
          queuer={queuer}
          onJoinWaitList={handleJoinWaitList}
        />
      </Box>
    </VStack>
  );
};

export default BorrowerLoanDetail;
