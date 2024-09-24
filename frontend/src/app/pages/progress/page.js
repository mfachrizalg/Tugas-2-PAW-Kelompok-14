"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]); // Untuk menyimpan data progress
  const [bookDetails, setBookDetails] = useState({}); // Untuk menyimpan detail buku berdasarkan bookId
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("_id");
  const [sortCriteria, setSortCriteria] = useState("_id");
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch data progress
        const progressResponse = await fetch("http://localhost:3000/progress", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setBooks(progressData.reading);
          setFilteredBooks(progressData.reading);

          // Ambil detail buku satu per satu berdasarkan bookId
          progressData.reading.forEach(async (reading) => {
            try {
              const bookDetailsResponse = await axios.get(
                `http://localhost:3000/book/${reading.bookId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // Simpan detail buku dalam objek bookDetails
              setBookDetails((prevBookDetails) => ({
                ...prevBookDetails,
                [reading._id]: bookDetailsResponse.data,
              }));
            } catch (error) {
              console.error(
                `Error fetching book details for ID ${reading._id}:`,
                error
              );
            }
          });
        } else if (progressResponse.status === 401) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching books or progress:", error);
      }
    };

    fetchBooks();
  }, [router]);

  const handleSort = (criteria) => {
    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (sortOrder === "desc") {
        return a[criteria].localeCompare(b[criteria]);
      } else {
        return b[criteria].localeCompare(a[criteria]);
      }
    });

    setFilteredBooks(sortedBooks);
    setSortCriteria(criteria);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = () => {
    const filtered = books.filter(
      (book) =>
        book[filterCriteria] &&
        book[filterCriteria].toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-black">Books List</h1>

      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="filterCriteria" className="mr-2">
            Filter by:
          </label>
          <select
            id="filterCriteria"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            className="p-2 border rounded-md text-black"
          >
            <option value="_id">id</option>
            <option value="name">name</option>
            <option value="description">Description</option>
          </select>

          <input
            type="text"
            placeholder="Enter filter text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 p-2 border rounded-md text-black"
          />

          <button
            onClick={handleFilter}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Filter
          </button>
        </div>

        <div>
          <label htmlFor="sortCriteria" className="mr-2 text-black">
            Sort by:
          </label>
          <select
            id="sortCriteria"
            value={sortCriteria}
            onChange={(e) => handleSort(e.target.value)}
            className="p-2 border rounded-md text-black"
          >
            <option value="_id">id</option>
            <option value="name">name</option>
            <option value="description">Description</option>
          </select>
        </div>
      </div>

      <ul className="space-y-4">
        {filteredBooks.map((reading) => (
          <li
            key={reading._id}
            className="bg-white p-4 rounded-lg shadow-md text-black"
          >
            <h2 className="text-xl font-bold text-black">
              {/* Tampilkan judul buku berdasarkan bookId */}
              {bookDetails[reading._id]?.title || "Loading..."}
            </h2>
            <p className="text-black">Page: {reading.page}</p>
            <p
              className={`inline-block px-3 py-1 text-black ${
                reading.status === "Reading" ? "bg-blue-200" : "bg-green-200"
              } rounded-lg`}
            >
              Status: {reading.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function Books() {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [filter, setFilter] = useState("");
//   const [filterCriteria, setFilterCriteria] = useState("_id");
//   const [sortCriteria, setSortCriteria] = useState("_id");
//   const router = useRouter();

//   // sort

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3000/progress", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setBooks(data.reading);
//         setFilteredBooks(data.reading);
//       } else if (response.status === 401) {
//         router.push("/login");
//       }
//     };

//     fetchBooks();
//   }, [router]);

//   const handleSort = (criteria) => {
//     const sortedBooks = [...filteredBooks].sort((a, b) => {
//       if (sortOrder === "desc") {
//         return a[criteria].localeCompare(b[criteria]);
//       } else {
//         return b[criteria].localeCompare(a[criteria]);
//       }
//     });

//     setFilteredBooks(sortedBooks);
//     setSortCriteria(criteria);
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   const handleFilter = () => {
//     const filtered = books.filter(
//       (book) =>
//         book[filterCriteria] &&
//         book[filterCriteria].toLowerCase().includes(filter.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-6 text-black">Books List</h1>

//       <div className="flex justify-between mb-4">
//         <div>
//           <label htmlFor="filterCriteria" className="mr-2">
//             Filter by:
//           </label>
//           <select
//             id="filterCriteria"
//             value={filterCriteria}
//             onChange={(e) => setFilterCriteria(e.target.value)}
//             className="p-2 border rounded-md text-black"
//           >
//             <option value="_id">id</option>
//             <option value="name">name</option>
//             <option value="description">Description</option>
//             {/* Add more filter options as needed */}
//           </select>

//           <input
//             type="text"
//             placeholder="Enter filter text"
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="ml-2 p-2 border rounded-md text-black"
//           />

//           <button
//             onClick={handleFilter}
//             className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//           >
//             Filter
//           </button>
//         </div>

//         <div>
//           <label htmlFor="sortCriteria" className="mr-2 text-black">
//             Sort by:
//           </label>
//           <select
//             id="sortCriteria"
//             value={sortCriteria}
//             onChange={(e) => handleSort(e.target.value)}
//             className="p-2 border rounded-md text-black"
//           >
//             <option value="_id">id</option>
//             <option value="name">name</option>
//             <option value="description">Description</option>
//             {/* Add more sort options as needed */}
//           </select>
//         </div>
//       </div>

//       <ul className="space-y-4">
//         {filteredBooks.map((book) => (
//           <li
//             key={book._id}
//             className="bg-white p-4 rounded-lg shadow-md text-black"
//           >
//             <h2 className="text-xl font-bold text-black">
//               {book.bookId || "No Data"}
//             </h2>
//             <p className="text-black">Page: {book.page}</p>
//             <p
//               className={`inline-block px-3 py-1 text-black ${
//                 book.status === "Reading" ? "bg-blue-200" : "bg-green-200"
//               } rounded-lg`}
//             >
//               Status: {book.status}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import axios from "axios";

// // export default function Books() {
// //   const [books, setBooks] = useState([]);
// //   const [filteredBooks, setFilteredBooks] = useState([]);
// //   const [sortOrder, setSortOrder] = useState("asc");
// //   const [filter, setFilter] = useState("");
// //   const [filterCriteria, setFilterCriteria] = useState("title");
// //   const [sortCriteria, setSortCriteria] = useState("title");
// //   const router = useRouter();

// //   useEffect(() => {
// //     const fetchBooks = async () => {
// //       const token = localStorage.getItem("token");
// //       const role = localStorage.getItem("roles");
// //       //const token = cookies.jwt;
// //       try {
// //         const response = fetch("http://localhost:5000/list", {
// //           method: "GET",
// //         });

// //         if (response.ok) {
// //           const data = await response.json();
// //           setBooks(data);
// //           setFilteredBooks(data);
// //         } else if (response.status === 401) {
// //           router.push("/login");
// //         }
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     fetchBooks();
// //   }, [router]);

// //   const handleSort = (criteria) => {
// //     const sortedBooks = [...filteredBooks].sort((a, b) => {
// //       if (sortOrder === "asc") {
// //         return a[criteria].localeCompare(b[criteria]);
// //       } else {
// //         return b[criteria].localeCompare(a[criteria]);
// //       }
// //     });

// //     setFilteredBooks(sortedBooks);
// //     setSortCriteria(criteria);
// //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //   };

// //   const handleFilter = () => {
// //     const filtered = books.filter((book) =>
// //       book[filterCriteria].toLowerCase().includes(filter.toLowerCase())
// //     );
// //     setFilteredBooks(filtered);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-8">
// //       <h1 className="text-3xl font-bold mb-6 text-black">Books List</h1>
// //       <div className="flex justify-between mb-4">
// //         <div>
// //           <label htmlFor="filterCriteria" className="mr-2">
// //             Filter by:
// //           </label>
// //           <select
// //             id="filterCriteria"
// //             value={filterCriteria}
// //             onChange={(e) => setFilterCriteria(e.target.value)}
// //             className="p-2 border rounded-md"
// //           >
// //             <option value="title">Title</option>
// //             <option value="author">Author</option>
// //             {/* Add more filter options as needed */}
// //           </select>

// //           <input
// //             type="text"
// //             placeholder="Enter filter text"
// //             value={filter}
// //             onChange={(e) => setFilter(e.target.value)}
// //             className="ml-2 p-2 border rounded-md"
// //           />

// //           <button
// //             onClick={handleFilter}
// //             className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
// //           >
// //             Filter
// //           </button>
// //         </div>

// //         <div>
// //           <label htmlFor="sortCriteria" className="mr-2">
// //             Sort by:
// //           </label>
// //           <select
// //             id="sortCriteria"
// //             value={sortCriteria}
// //             onChange={(e) => handleSort(e.target.value)}
// //             className="p-2 border rounded-md"
// //           >
// //             <option value="title">Title</option>
// //             <option value="author">Author</option>
// //             {/* Add more sort options as needed */}
// //           </select>
// //         </div>
// //       </div>

// //       <ul className="space-y-4">
// //         {filteredBooks.map((book) => (
// //           <li key={book._id} className="bg-black p-4 rounded-lg shadow-md ">
// //             <h2 className="text-xl font-bold">{book.title}</h2>
// //             <p className="text-gray-700">{book.author}</p>
// //           </li>
// //         ))}
// //       </ul>
// //       <ToastContainer />
// //     </div>
// //   );
// // }
