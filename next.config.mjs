/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb", // Increases the allowed payload size to 4 Megabytes
    },
  },
  images: {
    qualities: [100, 70],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**", // Allows all subfolders and images from your ImageKit account
      },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
