import Image from "next/image";

function Logo({ w, h }) {
  return (
    <Image
      src="/images/logo.png"
      width={w}
      height={h}
      alt="devBlog logo"
      quality={100}
    />
  );
}

export default Logo;
