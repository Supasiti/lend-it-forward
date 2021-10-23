import { MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { darkBtnColorProps } from '../staticProps/button';
import { cardProps } from '../staticProps/card';
import auth from '../utils/auth';

const navItemProps = {
  px: '4',
  py: '1',
};
// render
const NavList = () => {
  const history = useHistory();

  const handleLinkClick = (location) => {
    history.push(location);
  };

  if (auth.isLoggedIn()) {
    return (
      <MenuList {...cardProps}>
        <MenuItem
          {...darkBtnColorProps}
          {...navItemProps}
          onClick={() => handleLinkClick('/library')}
        >
          Your Library
        </MenuItem>
        <MenuDivider />
        <MenuItem
          {...darkBtnColorProps}
          {...navItemProps}
          onClick={() => auth.logout()}
        >
          Log Out
        </MenuItem>
      </MenuList>
    );
  }
  return (
    <MenuList {...cardProps}>
      <MenuItem
        {...darkBtnColorProps}
        {...navItemProps}
        onClick={() => handleLinkClick('/')}
      >
        Sign Up
      </MenuItem>
      <MenuItem
        {...darkBtnColorProps}
        {...navItemProps}
        onClick={() => handleLinkClick('/')}
      >
        Log In
      </MenuItem>
    </MenuList>
  );
};
export default NavList;
