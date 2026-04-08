"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const logout = async () => {
  const ck = (await cookies()).get("auth-token")?.value;
  if (ck) {
    try {
      const ck = (await cookies()).delete("auth-token");

      console.log("DELETED");
      return true;
    } catch (err) {
      console.log(err);
    }
  } else {
    return false;
  }

  return false;
};
