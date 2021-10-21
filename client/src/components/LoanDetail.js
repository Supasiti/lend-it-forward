import { Box, Center, Flex, Spinner, VStack } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { cardProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';
import { spinnerProps } from '../staticProps/spinner';
import UpdateLoanForm from './UpdateLoanForm';

const GET_LOAN = gql`
  query getLoan($id: ID) {
    loan(_id: $id) {
      _id
      title
      description
      category
      owner {
        _id
        username
      }
      holder {
        _id
        username
      }
      reservedFor {
        _id
        username
      }
    }
  }
`;

// render
const LoanDetail = ({ loanId }) => {
  const { data, loading } = useQuery(GET_LOAN, { variables: { id: loanId } });

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
            <UpdateLoanForm loan={data?.loan} />
          </Box>
        </Flex>
      </Box>

      <Box {...cardProps}>location management</Box>
    </VStack>
  );
};

export default LoanDetail;
