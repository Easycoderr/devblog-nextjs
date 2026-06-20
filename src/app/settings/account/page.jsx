import ChangeEmail from "@/features/settings/components/ChangeEmail";
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
        <ChangeEmail user={user} />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
}

export default page;
