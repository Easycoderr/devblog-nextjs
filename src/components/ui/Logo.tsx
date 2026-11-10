import Image from "next/image";

function Logo({ w, h }: { w: number; h: number }) {
  return (
    <Image
      src="/images/logo.png"
      width={w}
      height={h}
      alt="devBlog logo"
      quality={70}
    />
  );
}

export default Logo;
