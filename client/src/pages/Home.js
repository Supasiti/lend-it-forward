import {
  Container,
  Text,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  return (
    <Container maxW="container.sm" p="0">
      <Box bg="bermuda" borderRadius="full">
        <Text color="blackPearl" p={{ base: '3', sm: '5' }}>
          Search bar here
        </Text>
      </Box>

      <Tabs
        maxW="24rem"
        mx="auto"
        mt={{ base: 8, sm: 32 }}
        isFitted
        variant="soft-rounded"
        colorScheme="green"
      >
        <TabList bg="sidecar" borderRadius="full">
          <Tab
            p={{ base: '3', sm: '5' }}
            _hover={{
              background: 'peel',
              color: 'blackPearl',
              boxShadow: 'dark-lg',
            }}
          >
            Login
          </Tab>
          <Tab
            p={{ base: '3', sm: '5' }}
            _hover={{
              background: 'peel',
              color: 'blackPearl',
              boxShadow: 'dark-lg',
            }}
          >
            Sign up
          </Tab>
        </TabList>

        <TabPanels mt="8" bg="gray.700" borderRadius="3xl" boxShadow="dark-lg">
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <SignupForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Home;
