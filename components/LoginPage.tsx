// src/app/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData(e.target);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });
      if (response.ok) {
        console.log("RESPONSE: ", response);
        router.push("/");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error: any) {
      console.log("ERROR: ", error);
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
      <h1>Login to MHR Platform</h1>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <button
        className="bg-red-500 text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
