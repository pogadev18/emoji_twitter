import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { api } from "~/utils/api";
import { LoadingSpinner } from "./Loading";

const CreatePostWizard = () => {
  // trpc cache context
  const ctx = api.useContext();

  const [emoji, setEmoji] = useState("");
  const { user } = useUser();
  const { mutate, isLoading: creatingPost } = api.posts.create.useMutation({
    onSuccess: () => {
      setEmoji("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

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
        disabled={creatingPost}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (emoji !== "") {
              mutate({ content: emoji });
            }
          }
        }}
      />
      {emoji !== "" && !creatingPost && (
        <button
          disabled={creatingPost}
          onClick={() => mutate({ content: emoji })}
        >
          Post
        </button>
      )}
      {creatingPost && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

export default CreatePostWizard;
