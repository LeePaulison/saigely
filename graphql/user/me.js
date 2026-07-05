import { graphqlRequest } from "../graphql/graphqlClient";

const ME_QUERY = `
  query Me {
    me {
      authenticated
      user {
        id
        email
        name
        image
      }
    }
  }
`;

export async function getMe() {
  const data = await graphqlRequest({
    query: ME_QUERY,
  });

  return data.me;
}
