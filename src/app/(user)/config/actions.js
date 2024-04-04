"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getToken = async () => {
  const cookieStore = cookies(); // Access the cookie store

  const token = await cookieStore.get("token");

  if (!token) {
    // Handle the case where the cookie is not found (optional)
    return null;
  }

  const decodedToken = await jwt.verify(token.value, process.env.TOKEN_SECRET);
  return decodedToken;
};
