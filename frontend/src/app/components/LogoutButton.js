import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
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

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
