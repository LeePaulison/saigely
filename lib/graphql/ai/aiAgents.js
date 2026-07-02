import { graphqlRequest } from "../graphqlClient";

const GET_AIAGENTS_QUERY = `
  query GetAiAgents {
    aiAgents {
      agentId
      category
      name
      description
    }
  }
`;

export const getAiAgents = async () => {
  const result = await graphqlRequest({
    query: GET_AIAGENTS_QUERY,
  });

  console.log(result);

  return result.aiAgents;
};
