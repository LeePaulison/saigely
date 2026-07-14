import { graphqlRequest } from "../clientRequest";

const GET_CONVERSATION_QUERY = `
  query GetConversation($id: ID!) {
    conversation(id: $id) {
      id
      userId
      createdAt
      updatedAt
      messages {
        role
        content
        createdAt
      }
    }
  }
`;

export async function getConversation(id) {
  const data = await graphqlRequest({
    query: GET_CONVERSATION_QUERY,
    variables: {
      id,
    },
  });

  return data.conversation;
}
