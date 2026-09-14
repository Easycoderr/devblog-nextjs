import ErrorCard from "@/components/ui/ErrorCard";
import { messages } from "@/config/auth-error-messages";
export default async function page({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const { error } = await searchParams;
  const current = messages[error as keyof typeof messages] ?? messages.Default;
  return <ErrorCard title={current.title} description={current.description} />;
}
