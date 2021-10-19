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

const LOGIN = gql`
  mutation login($data: LoginData) {
    login(data: $data) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const initialState = { email: '', password: '' };

// render
const LoginForm = () => {
  const { formState, handleChange } = useForm(initialState);
  const [login] = useMutation(LOGIN);

  const handleSubmitForm = async () => {
    const data = { data: { ...formState } };
    const res = await login({
      variables: data,
    });

    // DO SOMETHING WITH TOKEN
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <VStack spacing={4} color="peel">
        <FormControl id="loginEmail">
          <FormLabel>Email address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">@</InputLeftElement>
            <Input
              type="email"
              placeholder="bob@youruncle.com"
              value={formState.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="loginPassword">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              {<LockIcon w={4} h={4} />}
            </InputLeftElement>
            <Input
              type="password"
              placeholder="password"
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

export default LoginForm;
