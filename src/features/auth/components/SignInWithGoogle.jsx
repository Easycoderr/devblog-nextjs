import Image from "next/image";
import { signInWithGoogle } from "@/lib/actions/signInWithGoogle";
function SignInWithGoogle() {
  return (
    <form action={signInWithGoogle} className="w-full">
      <button
        type="submit"
        className="min-w-full p-1.5 flex items-center justify-center bg-input hover:bg-input/75 rounded-lg gap-2 cursor-pointer transition-all duration-300"
      >
        <div className="relative h-8 w-8">
          <Image
            fill
            sizes="32px"
            alt="google logo"
            className="object-conver"
            src="/images/Google__G__logo.svg"
          />
        </div>
        <span>Sign in with google</span>
      </button>
    </form>
  );
}

export default SignInWithGoogle;
