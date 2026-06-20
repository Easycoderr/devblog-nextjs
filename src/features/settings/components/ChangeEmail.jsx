function ChangeEmail({ user }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-card border border-border p-4">
      <h3 className="col-span-2 text-foreground font-medium">Email Address</h3>
      <div className="flex md:flex-row md:justify-between flex-col gap-2 md:gap-8 md:items-center">
        <p className="text-foreground/80">{user?.email}</p>
        <button className="text-primary bg-primary/20 rounded-lg py-2 px-4 hover:opacity-75 cursor-pointer transition-all duration-200">
          Change Email
        </button>
      </div>
    </div>
  );
}

export default ChangeEmail;
