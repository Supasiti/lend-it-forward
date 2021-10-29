import { Box, Flex, VStack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useHistory } from 'react-router-dom';
import { useLogging } from '../dependecies/LoggingContext';

// style
const containerProps = {
  display: { base: 'block', sm: 'none' },
  pos: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '10',
  bg: 'blackPearl',
  color: 'sidecar',
  pt: '2',
};

const itemContainerProps = (select) => ({
  w: '25%',
  p: '1',
  spacing: '1',
  fontSize: 'xs',
  color: select ? 'peel' : 'sidecar',
  _hover: {
    color: 'peel',
    cursor: 'pointer',
  },
});

// render
const MobileNavItem = ({ icon, text, onClick, select = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <VStack {...itemContainerProps(select)} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} size="2x" />
      <Text textAlign="center">{text}</Text>
    </VStack>
  );
};

const getPageLocation = (location) => {
  const pathname = location.pathname;
  const result = pathname.split('/')[1];
  return result;
};

const isSelected = (location, text) => {
  const page = getPageLocation(location);
  return page === text;
};

//render
const MobileNavbar = () => {
  const location = useLocation();
  const history = useHistory();
  const { logging, logout: contextLogout } = useLogging();

  const handleClick = (page) => {
    history.push(page);
  };

  return (
    <Box {...containerProps}>
      <Flex justifyContent="center">
        <MobileNavItem
          icon="search"
          text="Search"
          select={isSelected(location, 'search')}
          onClick={() => handleClick('/search')}
        />
        <MobileNavItem
          icon="book"
          text="Library"
          select={isSelected(location, 'library')}
          onClick={() => handleClick('/library')}
        />
        {logging.isLoggedIn ? (
          <MobileNavItem
            icon="user-circle"
            text="Log out"
            onClick={() => contextLogout()}
          />
        ) : (
          <MobileNavItem
            icon="user-circle"
            text="Log in"
            onClick={() => handleClick('/')}
          />
        )}
      </Flex>
    </Box>
  );
};

export default MobileNavbar;
