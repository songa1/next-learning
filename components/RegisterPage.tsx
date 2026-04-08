// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.target);
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          bio: formData.get("bio"),
          password: formData.get("password"),
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto flex flex-col gap-2 shadow-lg p-5 rounded-lg"
    >
      <h1>Register to MHR Platform</h1>
      <input name="name" type="text" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="bio" placeholder="Bio" required></textarea>
      <input name="password" type="password" placeholder="Password" required />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        className="bg-red-500 text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-red-500">
          Login
        </Link>
      </p>
    </form>
  );
}
