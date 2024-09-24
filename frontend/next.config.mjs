/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/pages/login", // maps /login to /user/login
      },
      {
        source: "/books",
        destination: "/pages/booklist", // maps /books to /booklist
      },
    ];
  },
};
// next.config.js

export default nextConfig;
