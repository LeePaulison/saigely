import { graphqlRequest } from "../clientRequest";

const GET_AIMODELS_QUERY = `
  query GetAiModels {
    aiModels {
      modelId
      name
      provider
      description
      supportsTemperature
      supportsReasoning
      supportsVerbosity
    }
  }
  `;

export const getAiModels = async () => {
  const result = await graphqlRequest({
    query: GET_AIMODELS_QUERY,
  });

  return result.aiModels;
};
