import {
  Avatar,
  Flex,
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { helperProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import useForm from '../hooks/useForm';
import { updateObject } from '../utils/object';

const initialState = {
  _id: '',
  status: 'available',
  reservedFor: '',
};

// TODO - get Waiting list

// render
const ReserveLoanForm = ({ loan }) => {
  const { formState, setFormState } = useForm(initialState);

  // set the form state from props
  useEffect(() => {
    if (loan) {
      const newFormState = updateObject(formState, loan);
      setFormState(newFormState);
    }
  }, [loan]);

  // handle when the form change state
  const handleChange = (e) => {
    const newFormState = {
      ...formState,
      reservedFor: e.target.value,
      status: e.target.value ? 'reserved' : 'available',
    };
    setFormState(newFormState);
  };

  return (
    <>
      <Flex wrap="wrap">
        <Box
          flexBasis="0 0"
          w={{ base: '100%', sm: '50%', md: '33.33%' }}
          p="4"
        >
          <FormControl id="loanReserve">
            <FormLabel color="peel">Reserved this item for</FormLabel>

            <Box w="100%" p="4" textAlign="center">
              <Avatar mx="auto" size="lg" />
            </Box>

            <Select
              value={formState.reservedFor || initialState.reservedFor}
              onChange={(e) => handleChange(e, 'reservedFor')}
            >
              <option value="">Please select a borrower</option>
              <option value="available">Available</option>
            </Select>
          </FormControl>
        </Box>

        <Box
          flexBasis="0 0"
          w={{ base: '100%', sm: '50%', md: '33.33%' }}
          p="4"
        >
          <Text as="h3" fontSize="md" color="peel" mb="2">
            Contact Details
          </Text>
          <Text as="p" fontSize="md">
            their contact detail ....
          </Text>
        </Box>

        <Box flexBasis="0 0" w={{ base: '100%', md: '33.33%' }} p="4">
          <Text {...helperProps}>
            Select a borrower from a waiting list. Once selected, their contact
            details will be shown. Please discuss any logistic before click
            `reserved` below.
          </Text>
        </Box>
      </Flex>

      <Box p="4" w="100%" textAlign="center">
        <Button {...primaryBtnColorProps}>
          Reserve this item for this borrower
        </Button>
      </Box>
    </>
  );
};

export default ReserveLoanForm;
