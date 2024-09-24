"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SearchBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const router = useRouter();

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

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/book?title=${encodeURIComponent(searchTerm)}`
      );
      setBooks(response.data); // Assuming the response is an array of book objects
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Header />
      <h1 className="text-4xl font-bold mb-6 text-black">Search for Books</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter book title"
          className="border p-2 rounded mr-4 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded shadow">
            <Image
              src={book.image} // Ensure this matches your API response field
              alt={book.title}
              className="mb-4 w-full h-64 object-cover"
              width={256}
              height={256}
            />
            <h2 className="text-2xl font-bold mb-2 text-black">{book.title}</h2>
            <p className="text-gray-700">by {book.authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
