import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="bg-[#009746] text-white h-[70px] shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Логотип + Поиск (всегда слева) */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-3xl font-bold tracking-tight">
            BAHANDI
          </a>

          {/* Поиск — скрывается на мобильных */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Поиск..."
              value={query}
              onChange={handleSearch}
              className="w-80 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            />
            <svg
              className="absolute right-3 top-3 w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Десктопная навигация */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="/" className="hover:text-orange-200 transition font-medium">
            Бургеры
          </a>
          <a
            href="/drinks"
            className="hover:text-orange-200 transition font-medium"
          >
            Напитки
          </a>
          <a
            href="/combos"
            className="hover:text-orange-200 transition font-medium"
          >
            Комбо
          </a>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="bg-[#E35A1B] hover:bg-[#f56a2b] px-6 py-2.5 rounded-lg font-semibold transition relative"
            >
              Корзина
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#009746] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/profile"
              className="bg-[#1b5ae3] hover:bg-blue-700 px-6 py-2.5 rounded-lg font-semibold transition"
            >
              Профиль
            </Link>
          </div>
        </nav>

        {/* Мобильное бургер-меню */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9M7 13l-4 6h16l-4-6"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#009746] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню (выезжает сверху) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 right-0 bg-[#009746] shadow-2xl border-t border-white/20">
          <div className="container mx-auto px-6 py-6 space-y-6">
            {/* Поиск в мобильном меню */}
            <input
              type="text"
              placeholder="Поиск..."
              value={query}
              onChange={handleSearch}
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />

            <nav className="flex flex-col space-y-4 text-lg font-medium">
              <a href="/" className="hover:text-orange-200 transition py-2">
                Бургеры
              </a>
              <a
                href="/drinks"
                className="hover:text-orange-200 transition py-2"
              >
                Напитки
              </a>
              <a
                href="/combos"
                className="hover:text-orange-200 transition py-2"
              >
                Комбо
              </a>
              <Link
                to="/profile"
                className="block bg-[#1b5ae3] hover:bg-blue-700 px-6 py-3 rounded-lg text-center font-semibold transition mt-4"
              >
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
