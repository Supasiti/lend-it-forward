import { VStack, Box, Heading, Text, Divider } from '@chakra-ui/react';

import { capitalize, camelToNormal } from '../utils/text';

const boxProps = {
  w: '100%',
};

const headerProps = {
  as: 'h3',
  fontSize: '2xl',
  color: 'peel',
};

const textProps = {
  mt: '3',
  color: 'sidecar',
};

const LoanDescription = ({ loan }) => {
  const getStatus = (loan) => {
    if (loan?.status) {
      const textWithSpace = camelToNormal(loan.status);
      const result = capitalize(textWithSpace);
      return result;
    }
    return 'No status assigned';
  };

  return (
    <VStack spacing={6} pt={{ base: '0px', sm: '4' }}>
      <Box {...boxProps}>
        <Heading {...headerProps}>Title</Heading>
        <Divider />
        <Text {...textProps}>{loan?.title || 'No title'}</Text>
      </Box>

      <Box {...boxProps}>
        <Heading {...headerProps}>Description</Heading>
        <Divider />
        <Text {...textProps}>{loan?.description || 'No Description'}</Text>
      </Box>

      <Box {...boxProps}>
        <Heading {...headerProps}>Category</Heading>
        <Divider />
        <Text {...textProps}>{loan?.category || 'No category assigned'}</Text>
      </Box>

      <Box {...boxProps}>
        <Heading {...headerProps}>Status</Heading>
        <Divider />
        <Text {...textProps}>{getStatus(loan)}</Text>
      </Box>
    </VStack>
  );
};

export default LoanDescription;
