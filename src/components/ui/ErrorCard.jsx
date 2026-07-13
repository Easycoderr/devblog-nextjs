import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

function ErrorCard({
  title,
  description,
  href = "/auth/signin",
  buttonText = "Back to Sign In",
}) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="bg-card border-border w-full max-w-md rounded-2xl border p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-destructive/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <CircleX className="text-destructive h-8 w-8" />
          </div>

          <h1 className="text-foreground text-2xl font-bold">{title}</h1>

          <p className="text-muted-foreground mt-3 leading-relaxed">
            {description}
          </p>

          <Button asChild className="mt-8 w-full">
            <Link href={href}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorCard;
