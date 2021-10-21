import ChakraContainer from './Chakra';
import ApolloContainer from './Apollo';
import { LoanProvider } from './LoanContext';

const Dependencies = (props) => {
  return (
    <ApolloContainer>
      <ChakraContainer>
        <LoanProvider>{props.children}</LoanProvider>
      </ChakraContainer>
    </ApolloContainer>
  );
};

export default Dependencies;
