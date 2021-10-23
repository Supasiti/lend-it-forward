import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';
import color from '../constants/colors';

const theme = extendTheme({
  colors: { ...color },
  fonts: {
    heading: 'Josefin Sans',
    body: 'Montserrat',
  },
});

const ChakraContainer = (props) => <ChakraProvider theme={theme} {...props} />;

export default ChakraContainer;
