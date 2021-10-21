import ChakraContainer from './Chakra';
import ApolloContainer from './Apollo';
import { LoanContext } from './LoanContext';

const Dependencies = (props) => {
  return (
    <ApolloContainer {...props}>
      <ChakraContainer>
        <LoanContext />
      </ChakraContainer>
    </ApolloContainer>
  );
};

export default Dependencies;
