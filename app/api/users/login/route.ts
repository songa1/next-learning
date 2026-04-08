// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: any) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const jsonSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret";
  const { email, password } = await request.json();
  const response = NextResponse.next();
  // Find user
  const res = await fetch(`${process.env.JSON_SERVER_API}/users`);
  const users = await res.json();

  const user = users.find((u: any) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jsonSecret,
    { expiresIn: "7d" },
  );

  const resp = NextResponse.json({
    data: {
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });

  resp.cookies.set({
    name: "auth-token",
    value: token,
    httpOnly: true, // Cannot be read by JavaScript — protects from XSS
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  console.log("COOKIE: ", resp.cookies.get("auth-token")?.value);

  return resp;
}
