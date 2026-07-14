import { graphqlRequest } from "@/graphql/clientRequest";

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
  const data = await graphqlRequest(ME_QUERY);
  return data.me;
}
