import { Container, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import LoginOrSignupForm from '../components/LoginOrSignupForm';
import SearchForm from '../components/SearchForm';

const Home = () => {
  const history = useHistory();

  const onLogin = () => {
    history.push('/library');
  };

  return (
    <Container maxW="container.sm" p="0">
      <Box bg="bermuda" borderRadius="full" w="fit-content" mx="auto">
        <SearchForm />
      </Box>

      <Box mt={{ base: 8, sm: 32 }}>
        <LoginOrSignupForm onLogin={onLogin} onSignup={onLogin} />
      </Box>
    </Container>
  );
};

export default Home;
