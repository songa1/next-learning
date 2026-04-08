"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

const Tiptap = ({ content }: { content: any }) => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: content || "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
