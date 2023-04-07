import Link from "next/link";
import Image from "next/image";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { content, author, createdAt, id } = props;

  return (
    <article className="flex gap-3 border-b border-slate-400 p-4">
      <Image
        src={author?.profileImageUrl}
        className="h-12 w-12 rounded-full"
        alt={`@${author.username}'s profile picture`}
        width={56}
        height={56}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`}>
            <span>{`@${author.username} `}</span>
          </Link>
          <Link href={`/post/${id}`}>
            <span className="font-thin">{` · ${dayjs(
              createdAt
            ).fromNow()}`}</span>
          </Link>
        </div>
        <span className="text-2xl">{content}</span>
      </div>
    </article>
  );
};

export default PostView;
