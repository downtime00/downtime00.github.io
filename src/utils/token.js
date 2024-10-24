
export const TokenToPlayload = (token) => {
  const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  return atob(base64);
}
