import type { NextPage } from "next";
import Head from "next/head";
// import { PageLayout } from "~/components/layout";
// import { PostView } from "~/components/postview";
// import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  return (
    <>
      <Head>
        <title>post title</title>
      </Head>
      <div>post with id {id}</div>
    </>
  );
};

export default SinglePostPage;
