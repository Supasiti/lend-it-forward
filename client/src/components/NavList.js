import { MenuList, MenuItem, MenuDivider, MenuGroup } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { darkBtnColorProps } from '../staticProps/button';
import { cardProps } from '../staticProps/card';
import { useLogging } from '../dependencies/LoggingContext';

const navItemProps = {
  px: '4',
  py: '1',
};
// render
const NavList = () => {
  const history = useHistory();
  const { logging, logout: contextLogout } = useLogging();

  const handleLinkClick = (location) => {
    history.push(location);
  };

  //  if login
  if (logging.isLoggedIn) {
    return (
      <MenuList {...cardProps}>
        <MenuGroup title={`Welcome, ${logging.user.username}`} color="sidecar">
          <MenuItem
            {...darkBtnColorProps}
            {...navItemProps}
            onClick={() => handleLinkClick('/library')}
          >
            Your Library
          </MenuItem>
          <MenuItem
            {...darkBtnColorProps}
            {...navItemProps}
            onClick={() => handleLinkClick('/search')}
          >
            Start Your Search
          </MenuItem>
        </MenuGroup>

        <MenuDivider />
        <MenuItem
          {...darkBtnColorProps}
          {...navItemProps}
          onClick={() => contextLogout()}
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
