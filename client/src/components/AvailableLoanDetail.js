import { Box, Flex, VStack } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import UpdateLoanForm from './UpdateLoanForm';
import ReserveLoanForm from './ReserveLoanForm';
import { cardProps, circleProps } from '../staticProps/card';
import { squareProps } from '../staticProps/div';

const AvailableLoanDetail = ({ loan, onLoanUpdated }) => {
  return (
    <VStack spacing="6">
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

      <Box {...circleProps} p="2">
        <ArrowDownIcon w="6" h="6" />
      </Box>

      <Box {...cardProps}>
        <ReserveLoanForm loan={loan} onLoanUpdated={onLoanUpdated} />
      </Box>
    </VStack>
  );
};

export default AvailableLoanDetail;
