import { ApolloServer, gql } from 'apollo-server';

let tweets = [
  {
    id: '1',
    text: 'first one!',
    userId: '1',
  },
  {
    id: '2',
    text: 'second one',
    userId: '2',
  },
];

let users = [
  {
    id: '1',
    firstName: 'nico',
    lastName: 'las',
  },
  {
    id: '2',
    firstName: 'Elon',
    lastName: 'Mask',
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }

  type Tweet {
    id: ID!
    text: String
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
  }

  type Mutation {
    createTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    allTweets: () => {
      return tweets;
    },
    tweet: (root: any, args: any) => {
      console.log('root', root);
      console.log('args', args);
      return tweets.find((tweet) => tweet.id === args.id);
    },
    allUsers: (root: any) => {
      console.log('root', root);
      console.log('here here');
      return users;
    },
  },
  Mutation: {
    createTweet: (root: any, args: any) => {
      console.log('root', root);
      console.log('args', args);
      const newTweet = {
        id: args.userId,
        text: args.text,
        userId: args.userId,
      };
      return newTweet;
    },
    deleteTweet: (root: any, args: any) => {
      console.log('root', root);
      console.log('args', args);
    },
  },
  User: {
    fullName: (root: any) => {
      console.log('@@@@@', root);
      return `${root.firstName} ${root.lastName}`;
    },
  },
  Tweet: {
    author: (root: any) => {
      console.log('@@@@@', root);
      return users.find((user) => user.id === root.userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on  Server ready at ${url}`);
});
