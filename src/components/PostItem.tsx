import type { Post } from "@prisma/client";
import { usePost } from "../lib/hooks";
import { useEffect, useState } from "react";

type Props = { post: Post };

export const PostItem = ({ post }: Props) => {
  const { update, del } = usePost();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // fetch post author's profile
    fetch(`/api/user/${post.authorId}`)
      .then((res) => res.json())
      .then((u) => setEmail(u.email));
  }, [post]);

  async function onTogglePublished(post: Post) {
    await update({
      where: { id: post.id },
      data: { published: !post.published },
    });
  }

  async function onDelete(post: Post) {
    await del({ where: { id: post.id } });
  }

  return (
    <div className="flex">
      <p className={`text-2xl ${!post.published ? "text-gray-400" : ""}`}>
        {post.title}
        <span className="text-lg"> by {email}</span>
      </p>
      <div className="flex w-32 justify-end gap-1 text-left">
        <button className="underline" onClick={() => onTogglePublished(post)}>
          {post.published ? "Unpublish" : "Publish"}
        </button>
        <button className="underline" onClick={() => onDelete(post)}>
          Delete
        </button>
      </div>
    </div>
  );
};
