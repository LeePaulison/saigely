import { createYoga, createSchema } from "graphql-yoga";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type User {
        name: String
        email: String
      }

      type Query {
        me: User
      }
    `,

    resolvers: {
      Query: {
        me: async (_, __, context) => {
          return context.session?.user || null;
        },
      },
    },
  }),

  graphqlEndpoint: "/api/graphql",

  context: async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return {
      session,
    };
  },
});

export { yoga as GET, yoga as POST };
