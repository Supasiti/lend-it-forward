import { Flex, Box, Heading, Avatar, Text, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useGetWaitList } from '../hooks/useGetWaitList';

import { helperProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { updateObject } from '../utils/object';
import { useUpdateLoan } from '../hooks/useUpdateLoan';

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

// TODO - set status to available when click
const initialState = {
  _id: '',
  owner: null,
  holder: null,
  reservedFor: null,
  status: 'onLoan',
};

//render
const LoanBorrower = ({ loan }) => {
  const [loanState, setLoanState] = useState(initialState);
  const { waitList, getWaitList } = useGetWaitList();
  const { updateLoan } = useUpdateLoan();

  // update the list of queuer
  useEffect(() => {
    if (loan?.holder) {
      const newLoanState = updateObject(loanState, loan);
      const filter = {
        user: loan.holder._id,
        loan: loan._id,
      };
      getWaitList(filter);
      setLoanState(newLoanState);
    }
  }, [loan]);

  // handling when an item is returned
  const handleClick = (e) => {
    e.preventDefault();
    const newLoan = {
      _id: loanState._id,
      status: 'available',
      holder: loanState.owner._id,
      reservedFor: null,
    };
    updateLoan(newLoan);
  };

  return (
    <>
      <Flex wrap="wrap" pt="4">
        <Box {...containerProps}>
          {/* borrower */}
          <Heading {...headerProps}>Your Borrower</Heading>
          <Box w="100%" p="4" textAlign="center" mt="3">
            <Avatar mx="auto" size="xl" />
          </Box>
          <Text textAlign="center">
            {waitList[0]?.user?.username || 'No username available'}
          </Text>
        </Box>

        {/* Contact */}
        <Box {...containerProps}>
          <Heading {...headerProps}>Their Contact</Heading>
          <Text w="100%" mt="3">
            {waitList[0]?.contact || 'No contact available'}
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

      <Box p="4" w="100%" textAlign="center">
        <Button {...primaryBtnColorProps} onClick={handleClick}>
          Item Returned
        </Button>
      </Box>
    </>
  );
};

export default LoanBorrower;
