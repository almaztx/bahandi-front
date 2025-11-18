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
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Корзина</h1>

      {/* Список товаров */}
      <div className="space-y-4">
        {items.map((i) => (
          <div
            key={i.id}
            className="bg-white rounded-2xl shadow hover:shadow-md transition p-4 md:p-5 flex items-center gap-4"
          >
            {/* Картинка */}
            <img
              src={i.image}
              alt={i.name}
              className="w-24 h-24 object-cover rounded-xl"
            />

            {/* Инфо */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{i.name}</h3>
              <p className="text-gray-500 text-sm">{i.price} ₸ / шт</p>
            </div>

            {/* Контролы кол-ва */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrement(i.id)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition grid place-items-center"
              >
                <span className="text-gray-700 font-bold">-</span>
              </button>
              <span className="w-10 text-center font-semibold text-gray-800">
                {i.qty}
              </span>
              <button
                onClick={() => increment(i.id)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition grid place-items-center"
              >
                <span className="text-gray-700 font-bold">+</span>
              </button>
            </div>

            {/* Цена строки */}
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                {(i.price * i.qty).toFixed(2)} ₸
              </p>
            </div>

            {/* Удалить */}
            <button
              onClick={() => removeFromCart(i.id)}
              className="ml-4 text-gray-400 hover:text-red-500 transition"
              aria-label="Удалить"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Итого + кнопки */}
      <div className="mt-8 bg-white rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-gray-600">Итого к оплате:</p>
          <p className="text-3xl font-extrabold text-gray-900">
            {totalPrice.toFixed(2)} ₸
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Очистить
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
            Оформить заказ
          </button>
        </div>
      </div>

      {/* Назад */}
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Вернуться к покупкам
        </Link>
      </div>
    </div>
  );
}
