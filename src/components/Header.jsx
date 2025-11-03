import { useCart } from "../context/CartContext";

const Header = () => {
  const { cartItems, toggleCart, isCartOpen, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + parseInt(item.price.replace(/\s/g, "")) * item.count,
    0
  );
  return (
    <>
      <header className="bg-[#009746] text-white h-[70px] py-2 px-16 shadow-sm flex justify-between items-center fixed w-screen">
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
          <button
            onClick={toggleCart}
            className="bg-[#E35A1B] px-6 py-2 rounded-[10px] hover:bg-orange-600 relative"
          >
            Корзина
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-green-700 text-sm rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md shadow-2xl bg-opacity-40 flex justify-center items-center z-30">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Корзина</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Пока пусто</p>
            ) : (
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1 ml-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.count} × {item.price} ₸
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex justify-between font-semibold">
              <span>Итого:</span>
              <span>{total.toLocaleString()} ₸</span>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={toggleCart}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Закрыть
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Оформить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
