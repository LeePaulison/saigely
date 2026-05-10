export const userResolvers = {
  Query: {
    me: (_, __, context) => {
      return context.user;
    },
  },
};
