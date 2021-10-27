import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
  ApolloLink,
  from,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloContainer = (props) => (
  <ApolloProvider client={client} {...props} />
);

export default ApolloContainer;
