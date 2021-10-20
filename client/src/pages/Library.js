import {
  Box,
  Button,
  Heading,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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
import BaseModal from '../components/Modal';
import LoanList from '../components/LoanList';
import { primaryBtnColorProps } from '../staticProps/button';

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

      {/* modal */}

      <BaseModal onClose={onClose} isOpen={isOpen}>
        <ModalHeader>Add New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>asdfasdf</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </BaseModal>
    </Box>
  );
};

export default Library;
