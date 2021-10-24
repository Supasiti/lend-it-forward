import {
  Avatar,
  Flex,
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { helperProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useForm } from '../hooks/useForm';
import { updateObject } from '../utils/object';
import { useGetWaitList } from '../hooks/useGetWaitList';
import { useReserveLoan } from '../hooks/useReserveLoan';

// styling
const containerProps = {
  flexBasis: '0 0',
  w: { base: '100%', sm: '50%', md: '33.33%' },
  p: '4',
};

const helperContainerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '33.33%' },
  p: '4',
};

// initial state
const initialState = {
  _id: '',
  reservedFor: null,
};

// render
const ReserveLoanForm = ({ loan }) => {
  const { formState, setFormState } = useForm(initialState);
  const { waitList, getWaitList } = useGetWaitList();
  const { reserveLoan } = useReserveLoan();

  // set the form state from props
  useEffect(() => {
    if (loan) {
      const newFormState = updateObject(formState, loan);
      setFormState(newFormState);
      getWaitList(newFormState._id);
    }
  }, [loan]);

  // handle when the form change state
  const handleChange = (e) => {
    const queuerId = e.target.value;
    const matched = waitList.find((queuer) => queuer._id === queuerId);

    const newFormState = {
      ...formState,
      reservedFor: matched || null,
    };
    setFormState(newFormState);
  };

  // handle form sumission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formState.reservedFor) return;
    reserveLoan(formState);
  };

  return (
    <>
      <Flex wrap="wrap">
        <Box {...containerProps}>
          <FormControl id="loanReserve">
            <FormLabel color="peel">Reserved this item for</FormLabel>

            <Box w="100%" p="4" textAlign="center">
              <Avatar mx="auto" size="lg" />
            </Box>

            <Select
              value={formState?.reservedFor?._id || ''}
              onChange={(e) => handleChange(e, 'reservedFor')}
            >
              <option value="">Please select a borrower</option>

              {/* other options */}
              {waitList.map((queuer) => (
                <option key={queuer._id} value={queuer._id}>
                  {queuer.user.username}
                </option>
              ))}
            </Select>

            {/* helper text */}
            {waitList?.length === 0 && (
              <FormHelperText>
                There is currently no potential borrower
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box {...containerProps}>
          <Text as="h3" fontSize="md" color="peel" mb="2">
            Contact Details
          </Text>
          <Text as="p" fontSize="md">
            {formState?.reservedFor?.contact ||
              'A borrower has not been selected.'}
          </Text>
        </Box>

        <Box {...helperContainerProps}>
          <Text color="peel">Instruction</Text>
          <Text {...helperProps} mt="3">
            Select a borrower from a waiting list. Once selected, their contact
            details will be shown. Please discuss any logistic before click
            `reserved` below.
          </Text>
        </Box>
      </Flex>

      <Box p="4" w="100%" textAlign="center">
        <Button {...primaryBtnColorProps} onClick={handleSubmitForm}>
          Reserve the item for this borrower
        </Button>
      </Box>
    </>
  );
};

export default ReserveLoanForm;
