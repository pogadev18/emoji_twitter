import { LoadingPage } from "~/components/Loading";
import PostView from "~/components/PostView";

import { api } from "~/utils/api";

const PostsFeed = () => {
  const { data: posts, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;
  if (!posts) return <p>something went wrong</p>;

  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <PostView key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostsFeed;
