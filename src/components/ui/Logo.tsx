import Image from "next/image";

function Logo({ width }: { width: number }) {
  const height = Math.round((width * 127) / 384);

  return (
    <>
      <Image
        src="/images/logo-light-mode.webp"
        width={width}
        height={height}
        alt="devBlog logo"
        quality={50}
        className="dark:hidden block"
        priority
      />
      <Image
        src="/images/logo-dark-mode.webp"
        width={width}
        height={height}
        alt="devBlog logo"
        quality={50}
        className="dark:block hidden"
        priority
      />
    </>
  );
}

export default Logo;
