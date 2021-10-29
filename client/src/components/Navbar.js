import {
  Avatar,
  Box,
  // Flex,
  Heading,
  HStack,
  Spacer,
  Button,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import { primaryBtnColorProps } from '../staticProps/button';
import NavList from './NavList';

const navProps = {
  as: Button,
  pl: '3',
  pr: '1',
  rounded: 'full',
};

const containerProps = {
  display: { base: 'none', sm: 'flex' },
  alignItems: 'center',
  pos: 'fixed',
  bgGradient: 'linear(to-b, blackPearl, lagoon)',
  w: '100%',
  p: '3',
  justify: 'space-between',
  zIndex: '50',
};

// render
const Navbar = () => (
  <>
    <Box {...containerProps}>
      <Heading as="h3" size="lg" color="sidecar">
        <Link to="/">Lend It Forward </Link>
      </Heading>
      <Spacer />

      {/* nav bar  */}
      <Menu>
        <MenuButton {...primaryBtnColorProps} {...navProps}>
          <HStack spacing="3">
            <HamburgerIcon w={4} h={4} />
            <Avatar size="sm" />
          </HStack>
        </MenuButton>
        <NavList />
      </Menu>
    </Box>

    <Box p={{ base: '3', sm: '10' }} />
  </>
);

export default Navbar;
