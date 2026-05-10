export async function getConversation(conversationId) {
  const response = await fetch("/api/graphql", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `
          query GetConversation($conversationId: ID!) {
            conversation(
              conversationId: $conversationId
            ) {
              id

              messages {
                role
                content
              }
            }
          }
        `,

      variables: {
        conversationId,
      },
    }),
  });

  const result = await response.json();

  return result.data.conversation;
}
