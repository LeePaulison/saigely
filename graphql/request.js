// lib/graphql/request.js

import { cookies } from "next/headers";

export async function graphqlRequest({ query, variables = {} }) {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
}
