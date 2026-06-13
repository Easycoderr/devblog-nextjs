import UpdateProfileForm from "@/features/settings/components/UpdateProfileForm";
import getCurrentUser from "@/lib/getUser";

async function page() {
  const user = await getCurrentUser();
  return (
    <div>
      <div className="space-y-3">
        <h2 className="text-2xl tracking-wide text-start text-foreground font-sora font-semibold">
          Profile
        </h2>
        <p className="text-muted-foreground leading-relaxed tracking-normal font-medium">
          Manage your presonal information and how others see you on DevBlog.
        </p>
      </div>
      <UpdateProfileForm user={user} />
    </div>
  );
}

export default page;
