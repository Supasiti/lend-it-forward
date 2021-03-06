import {
  Center,
  Spinner,
  Box,
  Flex,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { spinnerProps } from '../staticProps/spinner';
import { GET_LOAN } from '../gql/loans';
import UpdateLoanForm from './UpdateLoanForm';
import ReserveLoanForm from './ReserveLoanForm';
import { cardProps } from '../staticProps/card';
import CollectLoan from './CollectLoan';
import LoanDescription from './LoanDescription';
import LoanBorrower from './LoanBorrower';
import UploadImage from './UploadImage';
import { helperProps } from './Input';
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

  return (
    <VStack spacing="6">
      {/* for reserved */}
      {['reserved'].includes(loan?.status) && (
        <Box {...cardProps}>
          <CollectLoan loan={loan} onLoanUpdated={handleLoanUpdate} />
        </Box>
      )}

      {/* for available, reserved */}
      {['available', 'reserved'].includes(loan?.status) && (
        <Box {...cardProps}>
          <ReserveLoanForm loan={loan} onLoanReserved={handleLoanUpdate} />
        </Box>
      )}

      {/* see when status is unavailable, available, reserved */}
      {['unavailable', 'available', 'reserved'].includes(loan?.status) && (
        <Box {...cardProps}>
          <Flex wrap="wrap" justify="center">
            <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
              <UploadImage id={loanId} model="loan" imageUrl={loan.imageUrl} />

              {!loan?.imageUrl && (
                <Text {...helperProps} p="2">
                  Drag and drop the photo of the item here. We recommend
                  choosing square photo (Max size: 10Mb)
                </Text>
              )}
            </Box>

            <Box flexBasis="0 0" w={{ base: '100%', md: '50%' }} p="4">
              <UpdateLoanForm loan={loan} onLoanUpdated={handleLoanUpdate} />
            </Box>
          </Flex>
        </Box>
      )}

      {/* visible when status is onLoan */}
      {['onLoan'].includes(loan?.status) && (
        <>
          <Box {...cardProps}>
            <LoanBorrower loan={loan} />
          </Box>

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
        </>
      )}
    </VStack>
  );
};

export default LoanDetail;
