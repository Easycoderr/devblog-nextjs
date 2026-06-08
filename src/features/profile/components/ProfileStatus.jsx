import {
  getTotalUserComments,
  getTotalUserLikes,
  getTotalUserPosts,
  getTotalUserShares,
} from "@/lib/actions/profile/getProfileStatus";

async function ProfileStatus({ userId }) {
  const [totalPosts, totalLikes, totalComments, totalShares] =
    await Promise.all([
      getTotalUserPosts(userId),
      getTotalUserLikes(userId),
      getTotalUserComments(userId),
      getTotalUserShares(userId),
    ]);
  return (
    <div className="flex md:col-span-2 col-span-3 md:col-start-2 items-center justify-between flex-wrap max-w-xl md:px-0 px-2">
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">
          {totalPosts}
        </span>
        <p className="text-muted-foreground text-xs md:text-sm">Articles</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">
          {totalLikes}
        </span>
        <p className="text-muted-foreground text-xs md:text-sm">Likes</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">
          {totalComments}
        </span>
        <p className="text-muted-foreground text-xs md:text-sm">Comments</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">
          {totalShares}
        </span>
        <p className="text-muted-foreground text-xs md:text-sm">Shares</p>
      </div>
    </div>
  );
}

export default ProfileStatus;
