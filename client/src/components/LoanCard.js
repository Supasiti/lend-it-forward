import { CheckIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  Spacer,
  Badge,
} from '@chakra-ui/layout';

const squareWrapperProps = {
  w: '100%',
  h: '0px',
  pb: '100%',
  bg: 'gunmetal',
  rounded: 'lg',
  overflow: 'hidden',
};

const LoanCard = ({ loan }) => {
  const isHere = loan?.owner?._id === loan?.holder?._id;

  return (
    <Box bg="gray.600" w="100%" rounded="2xl" p="2" boxShadow="dark-lg">
      <VStack spacing="3">
        {/* image */}
        <Box {...squareWrapperProps}>
          {loan?.imageUrl && <img src={loan.imageUrl} />}
        </Box>

        {/* info */}
        <HStack w="100%" px="3">
          <VStack spacing="2">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {loan.category}
            </Badge>
            <Text>{loan.title}</Text>
          </VStack>
          <Spacer />
          <Center>
            {isHere ? (
              <CheckIcon w={8} h={8} color="sidecar" />
            ) : (
              <TimeIcon w={8} h={8} color="sidecar" />
            )}
          </Center>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoanCard;
