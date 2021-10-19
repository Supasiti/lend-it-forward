import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChakraContainer from './dependecies/Chakra';
import ApolloContainer from './dependecies/Apollo';
import '@fontsource/josefin-sans/200.css';
import '@fontsource/montserrat/500.css';
import { Box, Container } from '@chakra-ui/layout';

import Home from './pages/Home';
import Wave from './components/Wave';
import Navbar from './components/Navbar';

const App = () => (
  <ApolloContainer>
    <ChakraContainer>
      <Router>
        <Box
          w="100%"
          minH="100vh"
          bgGradient="linear(to-r, blackPearl, lagoon)"
        >
          <Wave />
          <Container
            pos="relative"
            zIndex={1}
            maxW={{
              base: 'container.md',
              lg: 'container.lg',
              xl: 'container.xl',
            }}
            minH="100vh"
            fontSize={{ base: 'sm', sm: 'md' }}
          >
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              {/* <Route exact path="/saved" component={SavedBooks} /> 
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
            </Switch>
          </Container>
        </Box>
      </Router>
    </ChakraContainer>
  </ApolloContainer>
);

export default App;
