export const verifyAuthToken = (token: string | undefined): boolean => {
  // Your authentication logic here (e.g., verify the token against a database)
  // Return true if the token is valid, otherwise return false
  // You might want to use a library like jsonwebtoken for token verification

  if (token === "123") {
    return true;
  }

  return false;
};
