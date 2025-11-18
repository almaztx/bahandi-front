import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, totalPrice, increment, decrement, removeFromCart, clearCart } =
    useCart();

  if (!items.length)
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ваша корзина пуста
        </h2>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
        >
          Назад
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-10 text-center md:text-left">
        Ваша корзина
      </h1>

      {/* Пустая корзина */}
      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center">
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
          <p className="text-2xl text-gray-600 mb-6">Ваша корзина пуста</p>
          <Link
            to="/"
            className="inline-block bg-[#009746] hover:bg-green-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Перейти к покупкам →
          </Link>
        </div>
      ) : (
        <>
          {/* Список товаров */}
          <div className="space-y-6 mb-10">
            {items.map((i, index) => (
              <div
                key={i.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Фото */}
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-md"
                />

                {/* Инфо */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {i.name}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {i.price.toLocaleString()} ₸ / шт
                  </p>
                </div>

                {/* Количество */}
                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-3">
                  <button
                    onClick={() => decrement(i.id)}
                    className="w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 active:scale-90 transition-all duration-200 flex items-center justify-center"
                  >
                    <span className="text-xl font-bold text-gray-700">−</span>
                  </button>
                  <span className="w-16 text-center text-xl font-bold text-gray-900">
                    {i.qty}
                  </span>
                  <button
                    onClick={() => increment(i.id)}
                    className="w-10 h-10 rounded-full bg-[#009746] hover:bg-green-700 text-white shadow-md active:scale-90 transition-all duration-200 flex items-center justify-center"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>

                {/* Итоговая цена */}
                <div className="text-right">
                  <p className="text-2xl font-black text-[#009746]">
                    {(i.price * i.qty).toLocaleString()} ₸
                  </p>
                </div>

                {/* Удалить */}
                <button
                  onClick={() => removeFromCart(i.id)}
                  className="text-gray-400 hover:text-red-600 transition-all duration-300"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Итого */}
          <div className="bg-gradient-to-r from-[#009746] to-green-600 rounded-3xl shadow-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xl opacity-90">Итого к оплате</p>
                <p className="text-5xl font-black mt-2">
                  {totalPrice.toLocaleString()} ₸
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl font-semibold transition-all hover:scale-105"
                >
                  Очистить корзину
                </button>
                <button className="px-10 py-5 bg-[#E35A1B] hover:bg-orange-600 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>

          {/* Назад */}
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-gray-600 hover:text-[#009746] text-lg font-medium transition-all hover:translate-x-2"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Продолжить покупки
            </Link>
          </div>
        </>
      )}
    </div>
  );

  {
    /* Анимация появления */
  }
  <style jsx>{`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeIn {
      animation: fadeIn 0.6s ease-out forwards;
    }
  `}</style>;
}
