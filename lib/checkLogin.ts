"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const checkLogin = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const jsonSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret";
  const ck = (await cookies()).get("auth-token")?.value;
  if (ck) {
    console.log("COOKIE: ", ck);
    try {
      const decoded = await jwt.verify(ck, jsonSecret);
      console.log("DECODED: ", decoded);
      return decoded;
    } catch (err) {
      console.error("JWT Verification Error:", err);
      return null;
    }
  } else {
    return null;
  }
};
