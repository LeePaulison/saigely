import { graphqlRequest } from "../graphqlClient";

const GET_PREFERENCES_QUERY = `
  query GetPreferences {
    preferences {
      userId
      model
      temperature
    }
  }
`;

export const getPreferences = async () => {
  const result = await graphqlRequest({
    query: GET_PREFERENCES_QUERY,
  });

  console.log(result);

  return result.preferences;
};
