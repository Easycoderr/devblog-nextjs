import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import UserProfileLikedPosts from "./UserProfileLikedPosts";
import UserProfileSavedPosts from "./UserProfileSavedPosts";
import UserProfilePostList from "./UserProfilePostList";
import { Suspense } from "react";
import PostListSkeleton from "@/features/post/components/skeletons/PostListSkeleton";
import getPostsByUserId from "@/lib/actions/profile/getPostsByUserId";
import { getUserActivityCounts } from "@/lib/actions/profile/getUserActivityCounts";
import type { ProfileUserData } from "./ProfileHeader";
import type { UserType } from "@/types/userType";
type ProfileTabsProps = {
  user: ProfileUserData;
  currUser: UserType;
  activeTab: string;
  params: {
    page: number;
  };
};
async function ProfileTabs({
  user,
  currUser,
  activeTab,
  params,
}: ProfileTabsProps) {
  const currentPage = Number(params?.page) || 1;

  const [postStatus, activityCounts] = await Promise.all([
    getPostsByUserId(user.id, currentPage),
    getUserActivityCounts(user.id),
  ]);

  const { posts, totalCount } = postStatus;
  const { likedPostsCount, savedPostsCount } = activityCounts;
  return (
    <Tabs defaultValue={activeTab}>
      <TabsList variant="line" className="gap-8">
        <TabsTrigger value="posts" asChild>
          <Link href="?tabs=posts" scroll={false} className="w-full">
            Articles{" "}
            <span>
              <span>(</span>
              {posts?.length}
              <span>)</span>
            </span>
          </Link>
        </TabsTrigger>
        <TabsTrigger value="liked" asChild>
          <Link href="?tabs=liked" scroll={false} className="w-full">
            Liked
            <span>
              <span>(</span>
              {likedPostsCount}
              <span>)</span>
            </span>
          </Link>
        </TabsTrigger>
        <TabsTrigger value="saved" asChild>
          <Link href="?tabs=saved" scroll={false} className="w-full">
            Saved
            <span>
              <span>(</span>
              {savedPostsCount}
              <span>)</span>
            </span>
          </Link>
        </TabsTrigger>
      </TabsList>
      {activeTab === "posts" && (
        <TabsContent value="posts" className="mt-6 min-w-full">
          <Suspense key={activeTab} fallback={<PostListSkeleton />}>
            <UserProfilePostList
              totalCount={totalCount}
              posts={posts}
              currUser={currUser}
              currPage={currentPage}
            />
          </Suspense>
        </TabsContent>
      )}
      {activeTab === "liked" && (
        <TabsContent value="liked" className="mt-6">
          <Suspense fallback={<PostListSkeleton />}>
            <UserProfileLikedPosts
              user={user}
              currUser={currUser}
              currPage={currentPage}
            />
          </Suspense>
        </TabsContent>
      )}
      {activeTab === "saved" && (
        <TabsContent value="saved" className="mt-6">
          <Suspense fallback={<PostListSkeleton />}>
            <UserProfileSavedPosts
              user={user}
              currUser={currUser}
              currPage={currentPage}
            />
          </Suspense>
        </TabsContent>
      )}
    </Tabs>
  );
}

export default ProfileTabs;
