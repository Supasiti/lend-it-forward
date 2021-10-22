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
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import useForm from '../hooks/useForm';
import { validateEmail, validatePassword } from '../utils/formValidators';
import { inputProps } from './Input';
import { primaryBtnColorProps } from '../staticProps/button';
import { useLoginUser } from '../hooks/useLoginUser';

const initialState = { email: '', password: '' };

// render
const LoginForm = () => {
  const { formState, handleChange, clearForm } = useForm(initialState);
  const [login, { data }] = useLoginUser();
  const history = useHistory();

  // when form is submitted push to library
  useEffect(() => {
    if (data?.login) {
      clearForm();
      history.push('/library');
    }
  }, [data]);

  // handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    login({ variables: { data: { ...formState } } });
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
              value={formState.email || ''}
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

export default LoginForm;
