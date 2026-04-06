"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const BlogDetails = ({ id }) => {
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/articles/one`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          id: id,
        },
      });
      const data = await res.json();
      setArticle(data);
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
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
    <div className="max-w-6xl mx-auto">
      <h2>{article?.title}</h2>
      <p>{article?.desc}</p>
      <div dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}></div>
      <button
        className="bg-blue-500 px-5 py-2 text-white"
        onClick={() => router.back()}
      >
        Back
      </button>
      <button
        className="bg-red-500 px-5 py-2 text-white"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
};
