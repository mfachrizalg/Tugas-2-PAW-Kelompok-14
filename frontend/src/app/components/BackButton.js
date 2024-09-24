import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Kembali ke halaman sebelumnya
  };

  return (
    <button
      onClick={handleBack}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Back
    </button>
  );
};

export default BackButton;
