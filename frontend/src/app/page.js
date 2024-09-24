"use client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">
        Welcome to the Booklist
      </h1>
      <div className="space-y-4 ">
        <Link href="/login" legacyBehavior>
          <a className="text-xl text-blue-500 hover:underline p-4">Login</a>
        </Link>
      </div>
    </div>
  );
}
