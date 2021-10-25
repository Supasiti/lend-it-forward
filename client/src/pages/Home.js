import {
  Container,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { primaryBtnColorProps } from '../staticProps/button';
import SearchForm from '../components/SearchForm';

const tabProps = {
  p: { base: '3', sm: '5' },
};

const tabsProps = {
  maxW: '24rem',
  mx: 'auto',
  mt: { base: 8, sm: 32 },
  isFitted: true,
  variant: 'soft-rounded',
};

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

      <Tabs {...tabsProps}>
        <TabList bg="sidecar" borderRadius="full">
          <Tab {...tabProps} {...primaryBtnColorProps}>
            Login
          </Tab>
          <Tab {...tabProps} {...primaryBtnColorProps}>
            Sign up
          </Tab>
        </TabList>

        <TabPanels mt="8" bg="gunmetal" borderRadius="3xl" boxShadow="dark-lg">
          <TabPanel>
            <LoginForm onLogin={onLogin} />
          </TabPanel>
          <TabPanel>
            <SignupForm onSignup={onLogin} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Home;
