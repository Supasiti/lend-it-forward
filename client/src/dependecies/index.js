import { BrowserRouter as Router } from 'react-router-dom';
import ChakraContainer from './Chakra';
import ApolloContainer from './Apollo';
import { LoanProvider } from './LoanContext';
import { LoggingProvider } from './LoggingContext';

const Dependencies = (props) => {
  return (
    <ApolloContainer>
      <Router>
        <ChakraContainer>
          <LoanProvider>
            <LoggingProvider {...props} />
          </LoanProvider>
        </ChakraContainer>
      </Router>
    </ApolloContainer>
  );
};

export default Dependencies;
