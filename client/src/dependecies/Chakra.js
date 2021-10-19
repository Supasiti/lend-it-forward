import { ChakraProvider } from '@chakra-ui/react';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    blackPearl: '#001219',
    gunmetal: '#212A2E',
    lagoon: '#005f73',
    darkCyan: '#0a9396',
    bermuda: '#94D2BD',
    sidecar: '#e9d8a6',
    peel: '#EE9B00',
    tenne: '#CA6702',
    rust: '#BB3E03',
  },
  fonts: {
    heading: 'Josefin Sans',
    body: 'Montserrat',
  },
});

const ChakraContainer = (props) => <ChakraProvider theme={theme} {...props} />;

export default ChakraContainer;
