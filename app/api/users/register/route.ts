// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// In production, use a real database

export async function POST(request: any) {
  const { name, email, bio, password } = await request.json();
  // Check if user already exists

  const res = await fetch(`${process.env.JSON_SERVER_API}/users`);
  const users = await res.json();

  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 409 },
    );
  }
  // Hash the password (never store plain text!)
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    bio,
    password: hashedPassword,
    role: "student",
  };
  
  const user = await fetch(`${process.env.JSON_SERVER_API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  // Do not return the password
  const { password: _, ...userWithoutPassword } = newUser;
  return NextResponse.json(userWithoutPassword, { status: 201 });
}
