import { graphqlRequest } from "../graphqlClient";

const GET_PREFERENCES_QUERY = `
  query GetPreferences {
    preferences {
      userId
      theme
      defaultModelId
      defaultReasoningId
      defaultVerbosityId
      temperature
      defaultAgentId
    }
  }
`;

export const getPreferences = async () => {
  const result = await graphqlRequest({
    query: GET_PREFERENCES_QUERY,
  });

  return result.preferences;
};

export const updatePreferences = async (input) => {
  const result = await graphqlRequest({
    query: `
      mutation UpdatePreferences($input: UpdatePreferencesInput!) {
        updatePreferences(input: $input) {
          userId
          theme
          defaultModelId
          defaultReasoningId
          defaultVerbosityId
          temperature
          defaultAgentId
        }
      }
    `,
    variables: { input },
  });

  if (result.errors) {
    console.error("Result Errors: ", result.errors);

    throw new Error(result.errors.map((e) => e.message).join("\n"));
  }

  return result.updatePreferences;
};
