import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
  // ApolloLink,
  // from,
} from '@apollo/client';

// const httpLink = createHttpLink({ uri: '/graphql' });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => {
//     const token = localStorage.getItem('id_token');
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : '',
//       },
//     };
//   });

//   return forward(operation);
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: from([authMiddleware, httpLink]),
  uri: '/graphql',
});

const ApolloContainer = (props) => (
  <ApolloProvider client={client} {...props} />
);

export default ApolloContainer;
