import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = (props) => {
  const { addToCart } = useCart();

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 
                    shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Изображение с hover-зумированием */}
      <Link
        to={`/${props.category}/${props.id}`}
        className="block overflow-hidden rounded-t-2xl"
      >
        <img
          src={props.image}
          alt={props.name}
          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy" // ускоряет загрузку страницы
        />
      </Link>

      {/* Контент */}
      <div className="p-5">
        <Link to={`/${props.category}/${props.id}`}>
          <div className="font-bold text-xl text-gray-900 mb-1">
            {props.price} ₸
          </div>
          <h3 className="text-base text-gray-700 line-clamp-2 hover:text-[#009746] transition-colors">
            {props.name}
          </h3>
        </Link>

        {/* Кнопка "В корзину" */}
        <button
          onClick={() => addToCart(props)}
          className="mt-4 w-full bg-[#009746] hover:bg-[#007a3d] text-white font-semibold py-3 rounded-xl 
                     shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 
                     flex items-center justify-center gap-2"
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 9m5-9h10m-10 9a2 2 0 11-4 0m4 0a2 2 0 104 0m-4 0h8"
            />
          </svg>
          В корзину
        </button>
      </div>

      {/* Лёгкий бейдж "Хит" или "Новинка" — если захочешь */}
      {/* <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        Хит
      </span> */}
    </div>
  );
};

export default ProductCard;
