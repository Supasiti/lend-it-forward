import { Flex, Heading } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <Flex w="100%" p="5" justify="space-between">
    <Heading as="h3" size="lg" color="sidecar">
      <Link to="/">Lend It Forward </Link>
    </Heading>
  </Flex>
);

export default Navbar;
