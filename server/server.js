const express = require('express');
const path = require('path');

const apolloServer = require('./schemas');
const { graphqlUploadExpress } = require('graphql-upload');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// This middleware should be added before calling `applyMiddleware`.
app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 10 }),
);

// apply apollo server middleware before app
apolloServer.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(
      `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`,
    );
  });
});
