// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChakraContainer from './dependecies/Chakra';
import ApolloContainer from './dependecies/Apollo';
import Wave from './components/Wave';

const App = () => (
  <ApolloContainer>
    <ChakraContainer>
      {/* <Router> */}
      <>
        <Wave />
        {/* <Navbar />
          <Switch>
            <Route exact path="/" component={} />
            <Route exact path="/saved" component={SavedBooks} /> 
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch> */}
      </>
      {/* </Router> */}
    </ChakraContainer>
  </ApolloContainer>
);

export default App;
