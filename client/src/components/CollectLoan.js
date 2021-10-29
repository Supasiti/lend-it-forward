import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { helperProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useUpdateLoan } from '../hooks/useUpdateLoan';
import { updateObject } from '../utils/object';
import { useChakraToast } from '../hooks/useChakraToast';

// styling
const containerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '66.66%' },
  p: '4',
  spacing: '3',
};

const helperContainerProps = {
  flexBasis: '0 0',
  w: { base: '100%', md: '33.33%' },
  p: '4',
};

const initialState = {
  _id: '',
  status: 'reserved',
  holder: null,
  reservedFor: null,
};

//render
const CollectLoan = ({ loan, onLoanUpdated }) => {
  const [loanState, setLoanState] = useState(initialState);
  const { updateLoan, newLoan, error, setError } = useUpdateLoan();
  const { chakraToast } = useChakraToast(error, setError);

  // handle when loan is collect
  useEffect(() => {
    if (newLoan) {
      chakraToast('success', `Your item has been collected`);
      if (onLoanUpdated) {
        onLoanUpdated(newLoan);
      }
    }
  }, [newLoan]);

  // set formState from props
  useEffect(() => {
    if (loan) {
      const newFormState = updateObject(loanState, loan);
      setLoanState(newFormState);
    }
  }, [loan]);

  // handle click
  const handleClick = (e) => {
    e.preventDefault();
    if (loanState?._id) {
      const newLoan = {
        _id: loanState._id,
        holder: loanState.reservedFor.user._id,
        status: 'onLoan',
      };
      updateLoan(newLoan);
    }
  };

  return (
    <>
      <Flex wrap="wrap" alignItems="center">
        {/* instruction */}
        <Box {...containerProps}>
          <Text color="peel">Instruction</Text>
          <Text {...helperProps} mt="3">
            Once the borrow picked the item up, click on the
            &apos;collected&apos; button. This will record your item as &apos;on
            loan&apos;. You will be able to contact the borrow when you need the
            item back. You can still change the reservation for your item.
          </Text>
        </Box>

        {/* button */}
        <Box {...helperContainerProps} textAlign="center">
          <Button {...primaryBtnColorProps} onClick={handleClick}>
            Item is collected
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default CollectLoan;
