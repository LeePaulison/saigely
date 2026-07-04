import { graphqlRequest } from "../graphqlClient";

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

  console.log(result);

  return result.verbosityLevels;
}
