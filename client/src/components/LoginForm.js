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
import { validateEmail, validatePassword } from '../utils/formValidators';
import { inputProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';

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
  const { formState, handleChange, clearForm } = useForm(initialState);
  const [login] = useMutation(LOGIN);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await login({
      variables: { data: { ...formState } },
    });
    const token = res.data.login.token;
    auth.login(token);
    clearForm();
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <VStack spacing={4} color="peel">
        <FormControl id="loginEmail">
          <FormLabel>Email address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">@</InputLeftElement>
            <Input
              {...inputProps}
              isRequired
              type="email"
              isInvalid={!validateEmail(formState.email)}
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
              {...inputProps}
              isRequired
              type="password"
              placeholder="password"
              isInvalid={!validatePassword(formState.password)}
              value={formState.password}
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

export default LoginForm;
