/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["books.google.com"], // Tambahkan domain eksternal untuk gambar
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/pages", // maps /home to /pages
      },
      {
        source: "/login",
        destination: "/pages/login", // maps /login to /user/login
      },
      {
        source: "/books",
        destination: "/pages/booklist", // maps /books to /booklist
      },
      {
        source: "/search",
        destination: "/pages/searchBook", // maps /search to /searchBook
      },
      {
        source: "/progress",
        destination: "/pages/progress", // maps /progress to /progress
      },
      {
        source: "/register",
        destination: "/pages/register", // maps /recommendation to /recommendation
      },
    ];
  },
};

// next.config.js

export default nextConfig;
