import {
  Flex,
  Box,
  Heading,
  Text,
  Avatar,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { primaryBtnColorProps } from '../staticProps/button';
import { helperProps, TextArea } from './Input';
import { useForm } from '../hooks/useForm';
import { useJoinWaitList } from '../hooks/useJoinWaitList';
import { useGetWaitList } from '../hooks/useGetWaitList';
import { useLogging } from '../dependecies/LoggingContext';
import { useChakraToast } from '../hooks/useChakraToast';
import BaseModal from './Modal';
import LoginOrSignupForm from './LoginOrSignupForm';

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

// render
const JoinLoanWaitList = ({ loan }) => {
  const { formState, setFormState, handleChange } = useForm(initialState);
  const { joinWaitList, newQueuer, error, setError } = useJoinWaitList();
  const { waitList, getWaitList } = useGetWaitList();
  const { logging } = useLogging();
  const history = useHistory();
  const { chakraToast } = useChakraToast(error, setError);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // update form once fetch the queuer data (if exist)
  useEffect(() => {
    if (waitList.length) {
      const newFormState = { ...formState, contact: waitList[0].contact };
      setFormState(newFormState);
    }
  }, [waitList]);

  // if loan is passed in
  useEffect(() => {
    if (loan) {
      const newFormState = { ...formState, loan: loan._id };
      setFormState(newFormState);
      getWaitList({ loan: loan._id, user: logging.user._id });
    }
  }, [loan]);

  // when the form is successfully submitted
  useEffect(() => {
    if (newQueuer) {
      chakraToast('success', 'You are now on the waiting list!');
      history.push('/Library');
    }
  }, [newQueuer]);

  // join the waiting list
  const handleSubmitForm = () => {
    if (!formState.contact) {
      chakraToast('error', 'Please fill in your contact details');
      return;
    }
    if (!logging.isLoggedIn) {
      onOpen();
      return;
    }
    if (formState.loan && formState.contact) {
      console.log('joining...');
      joinWaitList(formState);
    }
  };

  // call when user logins
  const onLogin = () => {
    onClose();
    handleSubmitForm();
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
          {(waitList.length && 'Update your contact details') ||
            'Join the waiting list'}
        </Button>
      </Box>

      {/* login modal */}
      <BaseModal onClose={onClose} isOpen={isOpen}>
        <ModalHeader>Login or Signup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LoginOrSignupForm
            variant="none"
            onLogin={onLogin}
            onSignup={onLogin}
          />
        </ModalBody>
        <ModalFooter />
      </BaseModal>
    </>
  );
};

export default JoinLoanWaitList;
