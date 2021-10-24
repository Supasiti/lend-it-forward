import { Flex, Box, Heading, Avatar, Text } from '@chakra-ui/react';

import { helperProps } from './Input';

// styling
const containerProps = {
  flexBasis: '0 0',
  w: { base: '100%', sm: '50%', md: '33.33%' },
  p: '4',
  spacing: '3',
};

const helperContainerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '33.33%' },
  p: '4',
};

const headerProps = {
  as: 'h3',
  fontSize: '2xl',
  color: 'peel',
  w: '100%',
};

//render
const LoanBorrower = () => {
  return (
    <>
      <Flex wrap="wrap">
        <Box {...containerProps}>
          {/* borrower */}
          <Heading {...headerProps}>Your Borrower</Heading>
          <Box w="100%" p="4" textAlign="center" mt="3">
            <Avatar mx="auto" size="lg" />
          </Box>
          <Text textAlign="center">username</Text>
        </Box>

        {/* Contact */}
        <Box {...containerProps}>
          <Heading {...headerProps}>Their Contact</Heading>
          <Text w="100%" mt="3">
            No contact available
          </Text>
        </Box>

        {/* instruction */}
        <Box {...helperContainerProps}>
          <Heading {...headerProps}>Instruction</Heading>
          <Text {...helperProps} mt="3">
            Your item is currently on loan to this lovely human being. Their
            contact details are here for you to organise its return. Don&apos;t
            abuse this power. When the item is returned, click on the &apos;Item
            Returned&apos; button below.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default LoanBorrower;
