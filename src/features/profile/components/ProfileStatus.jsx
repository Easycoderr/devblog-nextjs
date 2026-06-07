import { getAllUserPosts } from "@/lib/actions/profile/getProfileStatus";

async function ProfileStatus({ userId }) {
  const allPosts = await getAllUserPosts(userId);
  return (
    <div className="flex md:col-span-2 col-span-3 md:col-start-2 items-center justify-between flex-wrap max-w-xl md:px-0 px-2">
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">
          {allPosts}
        </span>
        <p className="text-muted-foreground text-xs md:text-sm">Articles</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">240</span>
        <p className="text-muted-foreground text-xs md:text-sm">Likes</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">32</span>
        <p className="text-muted-foreground text-xs md:text-sm">Comments</p>
      </div>
      <div>
        <span className="font-bold tracking-wide text-sm md:text-lg">1.2k</span>
        <p className="text-muted-foreground text-xs md:text-sm">Followers</p>
      </div>
    </div>
  );
}

export default ProfileStatus;
