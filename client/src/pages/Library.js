import {
  Box,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import LoanList from '../components/LoanList';

const tabsProps = {
  mt: { base: 2 },
  variant: 'line',
  colorScheme: 'green',
};

const tabProps = {
  color: 'sidecar',
  _selected: {
    color: 'peel',
    borderBottomColor: 'peel',
  },
};

const Library = () => (
  <Box w="100%">
    <Heading as="h1" mt="6" fontSize="5xl" color="peel">
      Your Library
    </Heading>

    <Tabs {...tabsProps}>
      <TabList>
        <Tab {...tabProps}>Own</Tab>
        <Tab {...tabProps}>Borrowed</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px="0px">
          <LoanList />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default Library;
