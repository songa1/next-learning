import { NextResponse } from "next/server";

export const DELETE = async (req: any) => {
  try {
    const res = await fetch(
      `${process.env.JSON_SERVER_API}/posts/${req.headers.get("id")}`,
      {
        method: "DELETE",
      },
    );
    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.log("API ERROR: ", error);
    return NextResponse.json({ message: "Failed to delete article" });
  }
};
