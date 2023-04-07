import { useUser } from "@clerk/nextjs";

import Image from "next/image";

const CreatePostWizard = () => {
  const { user } = useUser();

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
        type="text"
        placeholder="type some emojis"
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default CreatePostWizard;
