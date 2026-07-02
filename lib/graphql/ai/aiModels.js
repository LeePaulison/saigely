import { graphqlRequest } from "../graphqlClient";

const GET_AIMODELS_QUERY = `
  query GetAiModels {
    aiModels {
      modelId
      name
      provider
      description
    }
  }
  `;

export const getAiModels = async () => {
  const result = await graphqlRequest({
    query: GET_AIMODELS_QUERY,
  });

  console.log(result);

  return result.aiModels;
};
