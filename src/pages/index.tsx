import { type NextPage } from "next";
import { SignInButton, useUser } from "@clerk/nextjs";
import Head from "next/head";

import CreatePostWizard from "~/components/CreatePostWizard";
import PostsFeed from "~/components/PostsFeed";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // start fetching posts ASAP
  api.posts.getAll.useQuery();

  // return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Emoji Twitter</title>
        <meta name="description" content="An emoji chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="w-full border-x border-slate-400 md:max-w-2xl">
          <div className="border-b border-slate-400 p-4">
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="btn">Sign in</button>
              </SignInButton>
            )}
            {isSignedIn && <CreatePostWizard />}
          </div>
          <PostsFeed />
        </div>
      </main>
    </>
  );
};

export default Home;
