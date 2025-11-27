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
        if (value.trim()) {
            searchParams.set("q", value.trim());
        } else {
            searchParams.delete("q");
        }
        setSearchParams(searchParams);
    };

    return (
        <header className="bg-[#009746] text-white h-[70px] shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center gap-6 lg:gap-8">
                    <Link to="/" className="text-3xl font-bold tracking-tight">
                        BAHANDI
                    </Link>

                    <div className="hidden md:flex items-center bg-white/20 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/30 focus-within:border-white/60 transition">
                        <input
                            type="text"
                            placeholder="Поиск по меню..."
                            value={query}
                            onChange={handleSearch}
                            className="bg-transparent text-white placeholder-white/70 outline-none w-64 lg:w-80 text-base"
                        />
                        <svg
                            className="w-5 h-5 text-white/70 ml-3"
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

                <nav className="hidden lg:flex items-center gap-8">
                    <a
                        href="/"
                        className="hover:text-gray-300 transition font-medium"
                    >
                        Бургеры
                    </a>
                    <a
                        href="/drinks"
                        className="hover:text-gray-300 transition font-medium"
                    >
                        Напитки
                    </a>
                    <a
                        href="/combos"
                        className="hover:text-gray-300 transition font-medium"
                    >
                        Комбо
                    </a>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/cart"
                            className="bg-[#E35A1B] hover:bg-[#f56a2b] px-5 py-2.5 rounded-xl font-semibold transition relative flex items-center gap-2"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-[#009746] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/profile"
                            className="bg-[#1be32f] hover:bg-green-500 px-5 py-2.5 rounded-xl font-semibold transition flex items-center gap-2.5"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </Link>
                    </div>
                </nav>

                <div className="lg:hidden flex items-center gap-4">
                    <Link to="/cart" className="relative p-2">
                        <svg
                            className="w-7 h-7"
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
                            <span className="absolute -top-1 -right-1 bg-white text-[#009746] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="ml-4 p-2"
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

            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-[70px] left-0 right-0 bg-[#009746] border-t border-white/20">
                    <div className="container mx-auto px-6 py-6 space-y-5">
                        <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/30">
                            <input
                                type="text"
                                placeholder="Поиск по меню..."
                                value={query}
                                onChange={handleSearch}
                                className="flex-1 bg-transparent text-white placeholder-white/70 outline-none"
                            />
                            <svg
                                className="w-5 h-5 text-white/70"
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

                        <nav className="space-y-4 text-lg font-medium">
                            <a
                                href="/"
                                className="block py-2 hover:text-orange-200 transition"
                            >
                                Бургеры
                            </a>
                            <a
                                href="/drinks"
                                className="block py-2 hover:text-orange-200 transition"
                            >
                                Напитки
                            </a>
                            <a
                                href="/combos"
                                className="block py-2 hover:text-orange-200 transition"
                            >
                                Комбо
                            </a>

                            <Link
                                to="/profile"
                                className="flex items-center gap-3 bg-[#1be32f] hover:bg-green-700 px-5 py-3 rounded-xl font-semibold transition mt-4"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Мой профиль
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
