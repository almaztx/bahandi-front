import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("q", value);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  };

  return (
    <header className="bg-[#009746] text-white h-[70px] py-2 px-25 shadow-sm flex justify-between items-center fixed w-screen">
      <div className="flex flex-row gap-4">
        <a href="/" className="text-3xl font-bold">
          BAHANDI
        </a>
        <input
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={handleSearch}
          className="w-full max-w-xs border-b px-2 py-1 focus:outline-none tracking-wider"
        />
      </div>
      <nav className="flex space-x-6 gap-2">
        <a href="/" className="py-2 hover:text-gray-300">
          Бургеры
        </a>
        <a href="/drinks" className="py-2 hover:text-gray-300">
          Напитки
        </a>
        <a href="/combos" className="py-2 hover:text-gray-300">
          Комбо
        </a>
        <Link
          to="/cart"
          className="bg-[#E35A1B] px-6 py-2 rounded-lg hover:bg-orange-600 relative"
        >
          Корзина
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-green-700 text-sm rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
        <Link
          to="profile"
          className="bg-[#E35A1B] px-4 py-2 rounded-lg hover:bg-orange-600 relative"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
