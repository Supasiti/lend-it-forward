import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/layout';
// import { Link } from 'react-router-dom';

const squareWrapperProps = {
  w: '100%',
  h: '0px',
  pb: '100%',
  bg: 'gunmetal',
  rounded: 'lg',
  overflow: 'hidden',
};

const containerProps = {
  bg: 'gray.600',
  w: '100%',
  rounded: '2xl',
  p: '2',
  boxShadow: 'dark-lg',
  _hover: { bg: 'gray.500', cursor: 'pointer' },
};

// render
const LoanCard = ({ loan }) => {
  const isHere = loan?.owner?._id === loan?.holder?._id;

  const handleClick = (e) => {
    e.preventDefault();

    window.location.replace(`/library/${loan?._id}`);
  };

  return (
    <Box {...containerProps} onClick={handleClick}>
      <VStack spacing="2">
        {/* image */}
        <Box {...squareWrapperProps}>
          {loan?.imageUrl && <img src={loan.imageUrl} />}
        </Box>

        {/* info */}
        <VStack w="100%" px="3" align="left">
          {/* badges */}
          <HStack spacing="2">
            {isHere ? (
              <Badge borderRadius="full" px="2" bg="darkCyan" color="sidecar">
                available
              </Badge>
            ) : (
              <Badge borderRadius="full" px="2" bg="rust" color="sidecar">
                on loan
              </Badge>
            )}
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {loan.category}
            </Badge>
          </HStack>

          {/* title */}
          <Text>{loan.title}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default LoanCard;
