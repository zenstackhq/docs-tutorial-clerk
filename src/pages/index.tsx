import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";
import { PostItem } from "../components/PostItem";
import { useCreatePost, useFindManyPost } from "../lib/hooks";

type AuthUser = { id: string; email?: string | null };

const Welcome = ({ user }: { user: AuthUser }) => {
  const { signOut } = useClerk();

  async function onSignout() {
    signOut();
  }
  return (
    <div className="flex gap-4">
      <h3 className="text-lg">Welcome back, {user?.email}</h3>
      <button className="text-gray-300 underline" onClick={onSignout}>
        Signout
      </button>
    </div>
  );
};

const SigninSignup = () => {
  return (
    <div className="flex gap-4 text-2xl">
      <Link href="/signin" className="rounded-lg border px-4 py-2">
        Signin
      </Link>
      <Link href="/signup" className="rounded-lg border px-4 py-2">
        Signup
      </Link>
    </div>
  );
};

const Posts = ({ user }: { user: AuthUser }) => {
  // check login
  const { userId } = useAuth();

  // Post crud hooks
  const { mutateAsync: createPost } = useCreatePost();

  // list all posts that're visible to the current user
  const { data: posts } = useFindManyPost(
    {
      orderBy: { createdAt: "desc" },
    },
    // fetch only when user's logged in
    { enabled: !!userId }
  );

  if (!userId) {
    return null;
  }

  async function onCreatePost() {
    const title = prompt("Enter post title");
    if (title) {
      await createPost({ data: { title, authorId: user.id } });
    }
  }

  return (
    <div className="container flex flex-col text-white">
      <button
        className="rounded border border-white p-2 text-lg"
        onClick={onCreatePost}
      >
        + Create Post
      </button>

      <ul className="container mt-8 flex flex-col gap-2">
        {posts?.map((post) => (
          <li key={post.id} className="flex items-end justify-between gap-4">
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
  const { user: clerkUser } = useUser();

  if (!clerkUser) return <p>Loading ...</p>;

  const user = {
    id: clerkUser?.id,
    email: clerkUser?.emailAddresses?.[0]?.emailAddress,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white">
        <h1 className="text-5xl font-extrabold">My Awesome Blog</h1>

        {user ? (
          // welcome & blog posts
          <div className="flex flex-col">
            <Welcome user={user} />
            <section className="mt-10">
              <Posts user={user} />
            </section>
          </div>
        ) : (
          // if not logged in
          <SigninSignup />
        )}
      </div>
    </main>
  );
};

export default Home;
