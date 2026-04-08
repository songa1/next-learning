"use client";

import Link from "next/link";
import useAuth from "@/lib/authContext";
import { logout } from "@/lib/logout";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const { user, authenticated } = useAuth();
  return (
    <nav className="container flex items-center justify-between mx-auto">
      <h2>ReadBlog</h2>
      <ul className="flex gap-2 items-center">
        <Link href="/">Articles</Link>
        <Link href="/create">Create Article</Link>
        {authenticated ? (
          <div className="flex gap-2 items-center">
            <p>{user?.email}</p>
            <button
              onClick={async () => {
                const res = await logout();
                if (res) {
                  router.push("/login");
                  router.refresh();
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </ul>
    </nav>
  );
};
