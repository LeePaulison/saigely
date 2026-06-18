export const getCurrentUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_URL}/api/users/me`,
    {
      credentials: "include",
    },
  );

  return await response.json();
};
