import { graphqlRequest } from "@/graphql/request";

export async function getCurrentUser() {
  const result = await graphqlRequest({
    query: `
      query Me {
        me {
          authenticated
          user {
            id
            email
            name
            image
          }
        }
      }
    `,
  });

  return result.data.me;
}
