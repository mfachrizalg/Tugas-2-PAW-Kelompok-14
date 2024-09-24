// pages/login.js
"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Only if you're using cookies
        }
      );
      const { token, roles } = response.data;
      if (response.data.err) {
      }
      console.log(response.data);
      // Save token to localStorage or cookies (depending on your preference)
      localStorage.setItem("token", token);
      localStorage.setItem("roles", roles); // Simpan role pengguna
      toast.success("Login Success, Redirect to Home", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => {
          // Redirect to a protected page after login
          router.push("/home");
        },
      });
    } catch (err) {
      toast.info("Login failed. Please check your credentials", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    //<div className="bg-violet-500">
    <div className="bg-gray-100">
      <div className="flex justify-center items-center h-screen">
        <form
          // onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Login
          </h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              id="email"
              type=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-950"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-950"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="mt-2 text-gray-700 text-center">
            Don't have an account?{" "}
            <Link href="/register" legacyBehavior>
              <a className="text-blue-600 hover:underline">Register</a>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
