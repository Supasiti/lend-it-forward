import { useParams } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';

import BorrowerLoanDetail from '../components/BorrowerLoanDetail';

const BorrowerLoanView = () => {
  const { loanId } = useParams();
  return (
    <Box w="100%">
      <Flex w="100%" mt="4" align="start">
        <Box w={{ base: '100%', lg: '75%' }} p="2">
          <BorrowerLoanDetail loanId={loanId} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BorrowerLoanView;
