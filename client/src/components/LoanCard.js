import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/layout';
import { cardProps, clickableProps } from '../staticProps/card';
import { useHistory } from 'react-router-dom';

const squareProps = {
  w: '100%',
  h: '0px',
  pb: '100%',
  bg: 'gunmetal',
  rounded: 'lg',
  overflow: 'hidden',
};

// render
const LoanCard = ({ loan }) => {
  const isHere = loan?.owner?._id === loan?.holder?._id;
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`./${loan?._id}`);
  };

  return (
    <Box {...cardProps} {...clickableProps} onClick={handleClick}>
      <VStack spacing="2">
        {/* image */}
        <Box {...squareProps}>
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
