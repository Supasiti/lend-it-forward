import {
  Avatar,
  Flex,
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

// render
const Navbar = () => (
  <Flex pos="relative" w="100%" p="5" justify="space-between">
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
  </Flex>
);

export default Navbar;
