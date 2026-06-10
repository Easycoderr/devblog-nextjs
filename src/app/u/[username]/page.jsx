import { getUserByUserName } from "@/lib/actions/auth";

import ProfileTabs from "@/features/profile/components/ProfileTabs";
import getCurrentUser from "@/lib/getUser";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import NotFound from "../not-found";

async function page({ params, searchParams }) {
  const { username } = await params;
  const resolvedParams = await searchParams;
  const [user, currUser] = await Promise.all([
    getUserByUserName(username),
    getCurrentUser(),
  ]);

  if (!user) {
    return NotFound();
  }
  return (
    <div className="space-y-12 relative w-full">
      {/* main */}
      <main className="container flex flex-col px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-y-6">
          <ProfileHeader user={user} username={username} currUser={currUser} />
          <div className="p-2 py-6 md:p-8">
            {/* tabs */}
            <ProfileTabs
              user={user}
              currUser={currUser}
              activeTab={resolvedParams?.tabs || "posts"}
            />
            {/*  */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
