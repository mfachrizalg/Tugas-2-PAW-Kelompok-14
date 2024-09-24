"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo_web from "../../public/logo/logo_black.png";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      <Image
        src={logo_web}
        alt="Logo"
        width={200}
        height={200}
        //className="w-8 h-8"
      />
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
