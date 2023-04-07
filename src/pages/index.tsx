import { type NextPage } from "next";
import { SignInButton, useUser } from "@clerk/nextjs";

import Head from "next/head";
import { api } from "~/utils/api";
import PostView from "./components/PostView";
import CreatePostWizard from "./components/CreatePostWizard";

const Home: NextPage = () => {
  const user = useUser();
  const { data: posts, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <p>loading posts...</p>;
  if (!posts) return <p>something went wrong</p>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="border-b border-slate-400 p-4">
            {!user.isSignedIn && (
              <SignInButton mode="modal">
                <button className="btn">Sign in</button>
              </SignInButton>
            )}
            {user.isSignedIn && <CreatePostWizard />}
          </div>
          <div className="flex flex-col">
            {posts.map((post) => (
              <PostView key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
