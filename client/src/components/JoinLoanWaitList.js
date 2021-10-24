import { Flex, Box, Heading, Text, Avatar, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { primaryBtnColorProps } from '../staticProps/button';
import { helperProps, TextArea } from './Input';
import { useForm } from '../hooks/useForm';
import { useJoinWaitList } from '../hooks/useJoinWaitList';

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

const headerProps = {
  as: 'h3',
  fontSize: 'xl',
  color: 'peel',
};

const initialState = {
  loan: null,
  contact: '',
};

const JoinLoanWaitList = ({ loan }) => {
  const { formState, setFormState, handleChange } = useForm(initialState);
  const { joinWaitList, data } = useJoinWaitList();
  const history = useHistory();

  // handle when form is submitted
  useEffect(() => {
    if (loan) {
      const newFormState = { ...formState, loan: loan._id };
      setFormState(newFormState);
    }
  }, [loan]);

  useEffect(() => {
    if (data?.joinWaitList) {
      history.push('/Library/#');
    }
  }, [data]);

  // join the waiting list
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formState.loan && formState.contact) {
      joinWaitList(formState);
    }
  };

  return (
    <>
      <Flex wrap="wrap">
        <Box {...containerProps}>
          <Heading {...headerProps} textAlign="center">
            Meet the owner..
          </Heading>

          <Box w="100%" p="4" textAlign="center">
            <Avatar mx="auto" size="lg" />
          </Box>

          <Text color="sidecar" textAlign="center">
            {loan?.owner && loan.owner.username}
          </Text>
        </Box>

        <Box {...containerProps} color="peel">
          <TextArea
            id="waitListContact"
            label="Your Contact Details"
            name="contact"
            value={formState?.contact || ''}
            placeholder="You can contact me on ..."
            onChange={(e) => handleChange(e, 'contact')}
          />
        </Box>

        <Box {...helperContainerProps}>
          <Text color="peel">Instruction</Text>
          <Text {...helperProps} mt="3">
            If you wish to borrow the item generously offered by this owner,
            please fill your contact details. They will only be shown to the
            owner for the purpose of organising any logistics. You will have an
            option to delete this contact later.
          </Text>
        </Box>
      </Flex>

      <Box mt="4" w="100%" textAlign="center">
        <Button {...primaryBtnColorProps} onClick={handleSubmitForm}>
          Join the waiting list
        </Button>
      </Box>
    </>
  );
};

export default JoinLoanWaitList;
