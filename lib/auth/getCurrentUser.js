import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
    },
    body: JSON.stringify({
      query: `
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
        `,
    }),
  });

  const result = await response.json();

  return result.data.me;
}
