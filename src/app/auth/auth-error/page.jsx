import ErrorCard from "@/components/ui/ErrorCard";
import { messages } from "@/config/auth-error-messages";
export default async function page({ searchParams }) {
  const { error } = await searchParams;
  const current = messages[error] ?? messages.Default;
  return <ErrorCard title={current.title} description={current.description} />;
}
