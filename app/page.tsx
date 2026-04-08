"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/articles`);
      const data = await res.json();
      setArticles(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/articles/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        id: id,
      },
    });
    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-5">
        {articles &&
          articles.map((item, index) => {
            return (
              <div className="shadow-lg p-5 rounded-lg" key={index + 1}>
                <h2>{item?.title}</h2>
                <p>{item?.desc}</p>
                <button
                  onClick={() => router.push(`/blog/${item?.id}`)}
                  className="bg-red-500 p-3 rounded-lg text-white mr-2"
                >
                  Read more
                </button>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="bg-red-500 p-3 rounded-lg text-white"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
