import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const {
        items,
        totalPrice,
        increment,
        decrement,
        removeFromCart,
        clearCart,
    } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 9m5-9h10m-10 9a2 2 0 11-4 0m4 0a2 2 0 104 0m-4 0h8"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Корзина пуста
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Добавьте товары, чтобы оформить заказ
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-[#009746] hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
                    >
                        Перейти к покупкам
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Корзина
                </h1>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 flex flex-col sm:flex-row items-center gap-6"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {item.price.toLocaleString()} ₸ / шт
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => decrement(item.id)}
                                        className="w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center transition-colors"
                                        aria-label="Уменьшить количество"
                                    >
                                        <span className="text-lg font-semibold">
                                            −
                                        </span>
                                    </button>

                                    <span className="w-16 text-center text-lg font-medium text-gray-900">
                                        {item.qty}
                                    </span>

                                    <button
                                        onClick={() => increment(item.id)}
                                        className="w-9 h-9 rounded-lg bg-[#009746] hover:bg-green-700 text-white flex items-center justify-center transition-colors"
                                        aria-label="Увеличить количество"
                                    >
                                        <span className="text-lg font-semibold">
                                            +
                                        </span>
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="text-xl font-bold text-[#009746]">
                                        {(
                                            item.price * item.qty
                                        ).toLocaleString()}{" "}
                                        ₸
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                    aria-label="Удалить товар"
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div>
                            <p className="text-lg text-gray-600">
                                Итого к оплате
                            </p>
                            <p className="text-4xl font-bold text-[#009746] mt-2">
                                {totalPrice.toLocaleString()} ₸
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                onClick={clearCart}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
                            >
                                Очистить корзину
                            </button>

                            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors order-1 sm:order-2">
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#009746] font-medium transition-colors"
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
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Продолжить покупки
                    </Link>
                </div>
            </div>
        </div>
    );
}
