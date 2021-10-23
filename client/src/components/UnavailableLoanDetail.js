import { Box, Flex, VStack } from '@chakra-ui/react';

import UpdateLoanForm from './UpdateLoanForm';
import { cardProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';

const UnavailableLoanDetail = ({ loan, onLoanUpdated }) => {
  return (
    <VStack spacing="4">
      <Box {...cardProps}>
        <Flex wrap="wrap" justify="center">
          <Box flexBasis="0 0" w={{ base: '100%', sm: '50%' }} p="4">
            <Box {...squareProps}>
              <div> image here</div>
            </Box>
          </Box>

          <Box flexBasis="0 0" w={{ base: '100%', md: '50%' }} p="4">
            <UpdateLoanForm loan={loan} onLoanUpdated={onLoanUpdated} />
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default UnavailableLoanDetail;
