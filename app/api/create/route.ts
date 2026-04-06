import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  console.log("API REQUEST: ", {id: Date.now().toString(), ...data});
  try {
    const res = await fetch(`${process.env.JSON_SERVER_API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id: Date.now().toString(), ...data}),
    });
    return NextResponse.json({ message: "Article created successfully" });
  } catch (error) {
    console.log("API ERROR: ", error);
    return NextResponse.json({ message: "Failed to create article" });
  }
};
