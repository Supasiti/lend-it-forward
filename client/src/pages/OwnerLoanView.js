import { useParams } from 'react-router';
import { Box, Flex, Heading } from '@chakra-ui/react';
import LoanDetail from '../components/LoanDetail';

const OwnerLoanView = () => {
  const { loanId } = useParams();
  return (
    <Box w="100%">
      <Heading as="h1" fontSize={{ base: '2xl', sm: '5xl' }} color="peel">
        Manage Your Item
      </Heading>

      <Flex w="100%" mt="4" align="start">
        <Box w={{ base: '100%', lg: '75%' }} p="2">
          <LoanDetail loanId={loanId} />
        </Box>
      </Flex>
    </Box>
  );
};
export default OwnerLoanView;
