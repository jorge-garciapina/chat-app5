const { ApolloError } = require("apollo-server-errors");

const authResolvers = {
  Query: {
    users: async (_source, _args, { dataSources }) => {
      return dataSources.authAPI.getUsers();
    },

    validateUserOperation: async (_source, _args, { dataSources, token }) => {
      try {
        return dataSources.authAPI.validateUserOperation(token);
      } catch (error) {
        throw new ApolloError(` ${error.message}`, "SERVER_ERROR");
      }
    },

    validateMessageReciever: async (_source, { receiver }, { dataSources }) => {
      try {
        return dataSources.authAPI.validateMessageReciever(receiver);
      } catch (error) {
        throw new ApolloError(` ${error.message}`, "SERVER_ERROR");
      }
    },
  },

  Mutation: {
    registerUser: async (
      _source,
      { email, username, password, avatar },
      { dataSources }
    ) => {
      try {
        // Register the user with the auth service
        const registerResponse = await dataSources.authAPI.registerUser({
          email,
          username,
          password,
        });

        // Create the same user in the user service
        await dataSources.userAPI.createUser({
          email,
          username,
          avatar,
        });

        return registerResponse;
      } catch (error) {
        // Throw an ApolloError with a custom message and code
        throw new ApolloError(` ${error.message}`, "SERVER_ERROR");
      }
    },

    loginUser: async (
      _source,
      { username, password },
      { dataSources, pubsub }
    ) => {
      try {
        const loggedInUser = await dataSources.authAPI.loginUser({
          username,
          password,
        });

        const userInfo = await dataSources.userAPI.getUserInfo({
          validatedUser: username,
        });

        return loggedInUser;
      } catch (error) {
        // Throw an ApolloError with a custom message and code
        throw new ApolloError(` ${error.message}`, "SERVER_ERROR");
      }
    },

    changePassword: async (
      _source,
      { token, oldPassword, newPassword },
      { dataSources }
    ) => {
      try {
        return await dataSources.authAPI.changePassword({
          token,
          oldPassword,
          newPassword,
        });
      } catch (error) {
        // Throw an ApolloError with a custom message and code
        throw new ApolloError(` ${error.message}`, "SERVER_ERROR");
      }
    },

    logoutUser: async (_source, { token }, { dataSources }) => {
      try {
        return await dataSources.authAPI.logoutUser({
          token,
        });
      } catch (error) {
        // Throw an ApolloError with a custom message and code
        throw new ApolloError(`Server Error: ${error.message}`, "SERVER_ERROR");
      }
    },
  },

  Subscription: {
    userLoggedIn: {
      subscribe: (_source, { notifiedUser }, { pubsub }) => {
        return pubsub.asyncIterator([USER_LOGGED_IN]);
      },
      resolve: (payload, args) => {
        if (payload.notifiedUser === args.notifiedUser) {
          return payload.userLoggedIn;
        }
      },
    },
  },
};

module.exports = authResolvers;
