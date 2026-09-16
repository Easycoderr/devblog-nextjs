import ChangeEmail from "@/features/settings/components/change-email/ChangeEmail";
import ChangePassword from "@/features/settings/components/ChangePassword";
import DeleteAccount from "@/features/settings/components/DeleteAccount";
import getCurrentUser from "@/lib/getUser";

async function page() {
  const user = await getCurrentUser();
  return (
    <div>
      <div className="space-y-3 mb-6">
        <h2 className="text-2xl tracking-wide text-start text-foreground font-sora font-semibold">
          Account
        </h2>
        <p className="text-muted-foreground leading-relaxed tracking-normal font-medium">
          Manage your account settings and email.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 py-2">
        {user?.provider === "google" ? (
          <div>
            You have signin with google provider you can manage your account by
            visiting{" "}
            <a
              className="bg-clip-text text-transparent bg-linear-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300 hover:opacity-75 hover:underline"
              href="https://support.google.com/accounts/answer/3118621?hl=en"
            >
              Manage Google Account
            </a>
          </div>
        ) : (
          <>
            <ChangeEmail user={user} />
            <ChangePassword />
          </>
        )}
        <DeleteAccount user={user} />
      </div>
    </div>
  );
}
export default page;
