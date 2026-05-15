/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb", // Increases the allowed payload size to 4 Megabytes
    },
  },
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
