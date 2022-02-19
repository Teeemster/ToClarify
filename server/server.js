//Require express and import the apollo server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

//Import the typedefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

//Set the server port up
const PORT = process.env.PORT || 3001;
const app = express();

//Create the apollo server and pass in schema data
const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    });

    //Start the apollo server
    await server.start();
    //Integrate the apollo server with the express aplication as middleware
    server.applyMiddleware({ app });
    //Log used to test the GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//Start the apollo server
startServer()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Serve up the static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
