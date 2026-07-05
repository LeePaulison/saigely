import { graphqlRequest } from "../request";

export async function getConversations() {
  const result = await graphqlRequest({
    query: `
      query Conversations {
        conversations {
          id
          updatedAt
          preview
        }
      }
    `,
  });

  return result.data.conversations;
}
