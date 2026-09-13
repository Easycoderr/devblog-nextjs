import AccentColor from "@/features/settings/components/AccentColor";
import AppearanceTheme from "@/features/settings/components/AppearanceTheme";

function page() {
  return (
    <div>
      <div className="space-y-3">
        <h2 className="text-2xl tracking-wide text-start text-foreground font-sora font-semibold">
          Appearance
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Customaize how DevBlog looks for you.
        </p>
      </div>
      <div className="grid mt-6 gap-4 grid-cols-1">
        <AppearanceTheme />
        <AccentColor />
      </div>
    </div>
  );
}

export default page;
