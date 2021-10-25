import {
  Container,
  Text,
  Button,
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

  const handleSearch = (e) => {
    e.preventDefault();
    history.push('/search');
  };

  const onLogin = () => {
    history.push('/library');
  };

  return (
    <Container maxW="container.sm" p="0">
      <Box bg="bermuda" borderRadius="full">
        <Text color="blackPearl" p={{ base: '3', sm: '5' }}>
          <Button w="100%" {...primaryBtnColorProps} onClick={handleSearch}>
            Search bar here
          </Button>
        </Text>
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
