import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import UserProfileLikedPosts from "./UserProfileLikedPosts";
import UserProfileSavedPosts from "./UserProfileSavedPosts";
import UserProfilePostList from "./UserProfilePostList";
import { Suspense } from "react";
import PostListSkeleton from "@/features/post/components/skeletons/PostListSkeleton";
import getPostsByUserId from "@/lib/actions/profile/getPostsByUserId";

async function ProfileTabs({ user, currUser, activeTab, params }) {
  const currentPage = Number(params?.page) || 1;
  const { posts, totalCount } = await getPostsByUserId(user?.id, currentPage);
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
          </Link>
        </TabsTrigger>
        <TabsTrigger value="saved" asChild>
          <Link href="?tabs=saved" scroll={false} className="w-full">
            Saved
          </Link>
        </TabsTrigger>
      </TabsList>
      {activeTab === "posts" && (
        <TabsContent value="posts" className="mt-6 min-w-full">
          <Suspense key={activeTab} fallback={<PostListSkeleton />}>
            <UserProfilePostList
              user={user}
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
