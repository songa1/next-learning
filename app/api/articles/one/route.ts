import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const res = await fetch(
      `${process.env.JSON_SERVER_API}/posts/${req.headers.get("id")}`,
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log("API ERROR: ", error);
    return NextResponse.json({ message: "Failed to fetch articles" });
  }
};
