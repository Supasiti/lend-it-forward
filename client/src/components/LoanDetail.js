import { Box, Center, Flex, Spinner, VStack } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { cardProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';
import { spinnerProps } from '../staticProps/spinner';
import UpdateLoanForm from './UpdateLoanForm';
import { GET_LOAN } from '../gql/loans';

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

  // spinning wheel on loading
  if (loading) {
    return (
      <Center minH="64">
        <Spinner {...spinnerProps} />
      </Center>
    );
  }

  return (
    <VStack spacing="4">
      <Box {...cardProps}>
        <Flex wrap="wrap" justify="center">
          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <Box {...squareProps}>
              <div> image here</div>
            </Box>
          </Box>

          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <UpdateLoanForm loan={loan} />
          </Box>
        </Flex>
      </Box>

      <Box {...cardProps}>location management</Box>
    </VStack>
  );
};

export default LoanDetail;
