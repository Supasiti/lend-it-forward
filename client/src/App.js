import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/josefin-sans/200.css';
import '@fontsource/montserrat/500.css';
import { Box, Container } from '@chakra-ui/react';

import Dependencies from './dependecies';
import Home from './pages/Home';
import Library from './pages/Library';
import Wave from './components/Wave';
import Navbar from './components/Navbar';

const containerProps = {
  pos: 'relative',
  zIndex: 1,
  flex: true,
  flexDir: 'column',
  maxW: {
    base: 'container.lg',
    lg: 'container.lg',
    xl: 'container.xl',
  },
  minH: '100vh',
  fontSize: { base: 'sm', sm: 'md' },
  color: 'sidecar',
};

const App = () => (
  <Dependencies>
    <Router>
      <Box w="100%" minH="100vh" bgGradient="linear(to-r, blackPearl, lagoon)">
        <Wave />
        <Container {...containerProps}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/library" component={Library} />
            {/* <Route exact path="/saved" component={SavedBooks} /> 
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} /> */}
          </Switch>
        </Container>
      </Box>
    </Router>
  </Dependencies>
);

export default App;
