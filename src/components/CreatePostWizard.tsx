import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const [emoji, setEmoji] = useState("");
  const { user } = useUser();
  const { mutate, isLoading: creatingPost } = api.posts.create.useMutation();

  const createPost = () => {
    mutate({ content: emoji });
    setEmoji("");
  };

  if (!user) return null;

  return (
    <div className="flex gap-3">
      <Image
        width="60"
        height="60"
        className="rounded-full"
        src={user.profileImageUrl}
        alt="profile image"
      />
      <input
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        type="text"
        placeholder="type some emojis"
        className="w-full bg-transparent outline-none"
      />
      <button onClick={createPost}>Post</button>
    </div>
  );
};

export default CreatePostWizard;
