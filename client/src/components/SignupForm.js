import {
  VStack,
  FormControl,
  FormLabel,
  InputLeftElement,
  Input,
  InputGroup,
  Button,
} from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useForm from '../hooks/useForm';
import { validateNonEmpty, validateEmail } from '../utils/formValidators';
import { inputProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useSignupUser } from '../hooks/useSignupUser';

const initialState = {
  username: '',
  email: '',
  password: '',
};

// render
const SignupForm = () => {
  const { formState, handleChange, clearForm } = useForm(initialState);
  const [signup, { data }] = useSignupUser();
  const history = useHistory();

  // when form is submitted push to library
  useEffect(() => {
    if (data?.addUser) {
      clearForm();
      history.push('/library');
    }
  }, [data]);

  // handle when
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    signup({ variables: { user: { ...formState } } });
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <VStack spacing={4} color="peel">
        <FormControl id="signupUsername">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">#</InputLeftElement>
            <Input
              {...inputProps}
              isRequired
              type="text"
              placeholder="bob"
              isInvalid={!validateNonEmpty(formState.username)}
              value={formState.username || ''}
              onChange={(e) => handleChange(e, 'username')}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="signupEmail">
          <FormLabel>Email address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">@</InputLeftElement>
            <Input
              {...inputProps}
              isRequired
              type="email"
              placeholder="bob@youruncle.com"
              isInvalid={!validateEmail(formState.email)}
              value={formState.email || ''}
              onChange={(e) => handleChange(e, 'email')}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="signupPassword">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <LockIcon w={4} h={4} />
            </InputLeftElement>
            <Input
              {...inputProps}
              isRequired
              type="password"
              placeholder="password"
              isInvalid={!validateNonEmpty(formState.password)}
              value={formState.password || ''}
              onChange={(e) => handleChange(e, 'password')}
            />
          </InputGroup>
        </FormControl>

        <Button type="submit" size="md" w="100%" {...primaryBtnColorProps}>
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default SignupForm;
