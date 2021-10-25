import {
  Box,
  Button,
  Heading,
  Spacer,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddLoanForm from '../components/AddLoanForm';
import LoanList from '../components/LoanList';
import PendingLoanList from '../components/PendingLoanList';
import { primaryBtnColorProps } from '../staticProps/button';
import { redirectIfNotLoggedIn } from '../utils/logging';

const tabsProps = {
  mt: { base: 2 },
  variant: 'line',
};

const tabProps = {
  color: 'sidecar',
  _selected: {
    color: 'peel',
    borderBottomColor: 'peel',
  },
};

// render
const Library = () => {
  redirectIfNotLoggedIn();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%">
      <HStack w="100%" mt={{ base: '0px', sm: '5xl' }}>
        <Heading as="h1" fontSize={{ base: '2xl', sm: '5xl' }} color="peel">
          Your Library
        </Heading>
        <Spacer />
        <Button {...primaryBtnColorProps} p="0px" onClick={onOpen}>
          <AddIcon w="4" h="4" color="blackPearl" />
        </Button>
      </HStack>

      <Tabs {...tabsProps}>
        <TabList>
          <Tab {...tabProps}>Own</Tab>
          <Tab {...tabProps}>Borrowed</Tab>
          <Tab {...tabProps}>Waiting List</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="0px" id="loanList">
            <LoanList />
          </TabPanel>
          <TabPanel id="borrow">
            <p>two!</p>
          </TabPanel>
          <TabPanel id="waitList">
            <PendingLoanList />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* modal */}
      <AddLoanForm onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default Library;
