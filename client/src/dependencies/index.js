import { BrowserRouter as Router } from 'react-router-dom';
import ChakraContainer from './Chakra';
import ApolloContainer from './Apollo';
import { LoanProvider } from './LoanContext';
import { LoggingProvider } from './LoggingContext';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCamera,
  faSave,
  faSearch,
  faBook,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

library.add(faCamera, faSave, faSearch, faBook, faUserCircle);

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
