"use client";
import Link from "next/link";
import logo_web from "../../../public/logo/logo_black.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleLogout } from "../components/Header";

export default function Home({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Panggil API logout
      const response = await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        {
          withCredentials: true, // Ini diperlukan untuk mengirimkan cookie (JWT) di request
        }
      );

      // Jika logout berhasil
      if (response.status === 200) {
        // Hapus token dari localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        // Arahkan pengguna ke halaman login
        router.push("/login");
      } else {
        // Menangani error jika API tidak berhasil
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  useEffect(() => {
    const checkCookie = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth", {
          withCredentials: true,
        });
        if (!response.data) {
          router.push("/login");
        }
      } catch (error) {
        // HANDLE ERROR
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized", error);
        } else {
          console.log("Error checking cookie:", error);
        }
      }
    };

    checkCookie();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 bg-white">
      <div className="flex items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          {/* Replace with your logo or icon */}
          <Image
            src={logo_web}
            alt="Logo"
            //className="w-8 h-8"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/search" legacyBehavior>
          <a className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-400">
            <h2 className="text-2xl mb-2">Search Book</h2>
          </a>
        </Link>
        <Link href="/books" legacyBehavior>
          <a className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-400">
            <h2 className="text-2xl mb-2">Book List</h2>
          </a>
        </Link>
        <Link href="/progress" legacyBehavior>
          <a className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-400">
            <h2 className="text-2xl mb-2">Progress</h2>
          </a>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-gray-200 p-6 rounded-lg text-center hover:bg-gray-400"
        >
          <h2 className="text-2xl mb-2">Log Out</h2>
        </button>
      </div>
    </div>
  );
}
