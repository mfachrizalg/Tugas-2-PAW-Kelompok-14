import BackButton from "./BackButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  return (
    <div className="flex justify-end px-4 py-2 bg-gray-100 shadow space-x-4">
      <BackButton />
      <LogoutButton />
    </div>
  );
};

export default Header;
