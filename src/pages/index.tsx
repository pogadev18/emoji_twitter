import { type NextPage } from "next";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts } = api.post.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <p>hello</p>
        {!user.isSignedIn && (
          <SignInButton mode="modal">
            <button className="btn">Sign in</button>
          </SignInButton>
        )}
        {!!user.isSignedIn && <SignOutButton />}
        <div>
          {posts?.map((post) => (
            <article key={post.id}>{post.content}</article>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
