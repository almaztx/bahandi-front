import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalItems } = useCart();
  return (
    <header className="bg-[#009746] text-white h-[70px] py-2 px-25 shadow-sm flex justify-between items-center fixed w-screen">
      <div className="text-2xl font-bold">
        <a href="/">BAHANDI</a>
      </div>
      <nav className="flex space-x-6 gap-2">
        <a href="/" className="py-2">
          Бургеры
        </a>
        <a href="/drinks" className="py-2">
          Напитки
        </a>
        <a href="/combos" className="py-2">
          Комбо
        </a>
        <Link
          to="/cart"
          className="bg-[#E35A1B] px-6 py-2 rounded-[10px] hover:bg-orange-600 relative"
        >
          Корзина
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-green-700 text-sm rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
