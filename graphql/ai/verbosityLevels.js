import { graphqlRequest } from "../clientRequest";

const GET_VERBOSITY_LEVELS_QUERY = `
  query GetVerbosityLevels {
    verbosityLevels {
      levelId
      name
      description
    }
  }
`;

export async function getVerbosityLevels() {
  const result = await graphqlRequest({
    query: GET_VERBOSITY_LEVELS_QUERY,
  });

  return result.verbosityLevels;
}
