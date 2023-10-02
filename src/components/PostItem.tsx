import type { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { useMutatePost } from "../lib/hooks";

type Props = { post: Post };

export const PostItem = ({ post }: Props) => {
  const { updatePost, deletePost } = useMutatePost();
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // fetch post author's profile
    fetch(`/api/user/${post.authorId}`)
      .then((res) => res.json())
      .then((u) => setEmail(u.email));
  }, [post]);

  async function onTogglePublished(post: Post) {
    await updatePost({
      where: { id: post.id },
      data: { published: !post.published },
    });
  }

  async function onDelete(post: Post) {
    await deletePost({ where: { id: post.id } });
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
