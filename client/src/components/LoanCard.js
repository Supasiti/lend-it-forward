import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';
import { cardProps, clickableProps } from '../staticProps/card';
import StatusBadge from './StatusBadge';

const squareProps = {
  w: '100%',
  h: '0px',
  pb: '100%',
  bg: 'gunmetal',
  rounded: 'lg',
  overflow: 'hidden',
};

// render
const LoanCard = ({ loan, onClick }) => {
  // handle click if it is available
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <Box p="2" {...cardProps} {...clickableProps} onClick={handleClick}>
      <VStack spacing="2">
        {/* image */}
        <Box {...squareProps}>
          {loan?.imageUrl && <img src={loan.imageUrl} />}
        </Box>

        {/* info */}
        <VStack w="100%" px="3" align="left">
          {/* badges */}
          <HStack spacing="2">
            {loan && <StatusBadge loan={loan} />}
            <Badge borderRadius="full" px="2" bg="darkCyan" color="sidecar">
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
