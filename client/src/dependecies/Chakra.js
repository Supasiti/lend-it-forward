import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
});

const ChakraContainer = (props) => <ChakraProvider theme={theme} {...props} />;

export default ChakraContainer;
