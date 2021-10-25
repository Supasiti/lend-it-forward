import ChakraContainer from './Chakra';
import ApolloContainer from './Apollo';
import { LoanProvider } from './LoanContext';
import { LoggingProvider } from './LoggingContext';

const Dependencies = (props) => {
  return (
    <ApolloContainer>
      <ChakraContainer>
        <LoanProvider>
          <LoggingProvider {...props} />
        </LoanProvider>
      </ChakraContainer>
    </ApolloContainer>
  );
};

export default Dependencies;
