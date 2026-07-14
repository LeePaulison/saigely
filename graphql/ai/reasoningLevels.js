import { graphqlRequest } from "../clientRequest";

const GET_REASONING_LEVELS_QUERY = `
  query GetReasoningLevels {
    reasoningLevels {
      levelId
      name
      description
    }
  }
`;

export async function getReasoningLevels() {
  const result = await graphqlRequest({
    query: GET_REASONING_LEVELS_QUERY,
  });

  return result.reasoningLevels;
}
