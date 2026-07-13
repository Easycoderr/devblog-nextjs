import ErrorCard from "@/components/ui/ErrorCard";
export default async function page({ searchParams }) {
  const { error } = await searchParams;

  const messages = {
    AccessDenied: {
      title: "Sign in failed",
      description:
        "This account was created using email and password. Please sign in using your credentials.",
    },

    OAuthAccountNotLinked: {
      title: "Different sign-in method",
      description:
        "This account is already associated with another sign-in method.",
    },

    Configuration: {
      title: "Configuration Error",
      description: "Something went wrong while configuring authentication.",
    },

    Default: {
      title: "Something went wrong",
      description: "An unexpected error occurred while signing you in.",
    },
  };

  const current = messages[error] ?? messages.Default;

  return <ErrorCard title={current.title} description={current.description} />;
}
