import { cookies } from "next/headers";

export const Token = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token.value;
};
