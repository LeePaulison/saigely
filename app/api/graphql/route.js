import { createYoga, createSchema } from "graphql-yoga";

import { createContext } from "@/graphql/context";
import { typeDefs } from "@/graphql/schemas";
import { resolvers } from "@/graphql/resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export { yoga as GET, yoga as POST };
