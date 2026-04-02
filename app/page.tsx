import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function HomePage() {
  const router = useRouter()
  

  return (
    <div>
      <h1>MHR Learning Platform</h1>
      <p>Welcome to Mastery Hub of Rwanda</p>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}
