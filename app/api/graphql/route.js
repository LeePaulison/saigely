import { createYoga, createSchema } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";

import { auth } from "@/lib/auth/auth";

import { conversationResolvers } from "@/graphql/resolvers/conversation";
import { userResolvers } from "@/graphql/resolvers/user";

const typesArray = loadFilesSync("graphql/schemas/**/*.graphql");

const typeDefs = mergeTypeDefs(typesArray);

const resolvers = mergeResolvers([userResolvers, conversationResolvers]);

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),

  graphqlEndpoint: "/api/graphql",

  context: async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return {
      session,
      user: session?.user,
      request,
    };
  },
});

export { yoga as GET, yoga as POST };
