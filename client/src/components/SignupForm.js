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
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../hooks/useForm';
import auth from '../utils/auth';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/formValidators';

const SIGNUP = gql`
  mutation addUser($user: UserData) {
    addUser(user: $user) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const initialState = {
  username: '',
  email: '',
  password: '',
};

// render
const SignupForm = () => {
  const { formState, handleChange, clearForm } = useForm(initialState);
  const [signup] = useMutation(SIGNUP);

  // handle when
  const handleSubmitForm = async () => {
    const data = { user: { ...formState } };
    const res = await signup({
      variables: data,
    });

    const token = res.data.login.token;
    auth.login(token);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <VStack spacing={4} color="peel">
        <FormControl id="signupUsername">
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">#</InputLeftElement>
            <Input
              isRequired
              type="text"
              placeholder="bob"
              errorBorderColor="rust"
              isInvalid={!validateUsername(formState.username)}
              value={formState.username}
              onChange={(e) => handleChange(e, 'username')}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="signupEmail">
          <FormLabel>Email address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">@</InputLeftElement>
            <Input
              isRequired
              type="email"
              placeholder="bob@youruncle.com"
              errorBorderColor="rust"
              isInvalid={!validateEmail(formState.email)}
              value={formState.email}
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
              isRequired
              type="password"
              placeholder="password"
              errorBorderColor="rust"
              isInvalid={!validatePassword(formState.password)}
              value={formState.password}
              onChange={(e) => handleChange(e, 'password')}
            />
          </InputGroup>
        </FormControl>

        <Button
          type="submit"
          w="100%"
          bg="bermuda"
          size="md"
          color="blackPearl"
          _hover={{
            background: 'peel',
          }}
        >
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default SignupForm;
