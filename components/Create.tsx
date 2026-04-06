"use client";

import { useState } from "react";
import Tiptap from "./Tiptap";

export const Create = () => {
  const [title, setTitlte] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Title: ", title, "Description: ", desc);

    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
        content,
      }),
    });

    const data = await res.json();
    console.log("API RESPONSE: ", data);
  };

  return (
    <form className="max-w-5xl mx-auto flex flex-col gap-2">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitlte(e.target.value)}
        className="shadow p-2 outline"
      />

      <label>Description</label>
      <textarea
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="shadow p-2 outline"
      ></textarea>

      <label>Content</label>
      {/* <textarea
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="shadow p-2 outline"
      ></textarea> */}

      <Tiptap content={content}/>

      <button onClick={handleSubmit}>Create Article</button>
    </form>
  );
};
