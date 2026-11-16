import Image from "next/image";

function Logo({ width }: { width: number }) {
  const height = Math.round((width * 127) / 384);

  return (
    <Image
      src="/images/logo.png"
      width={width}
      height={height}
      alt="devBlog logo"
      quality={70}
    />
  );
}

export default Logo;
