import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = (props) => {
    const { addToCart } = useCart();

    return (
        <div
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 
                    shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
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

            <div className="p-5">
                <Link to={`/${props.category}/${props.id}`}>
                    <div className="font-bold text-xl text-gray-900 mb-1">
                        {props.price} ₸
                    </div>
                    <h3 className="text-base text-gray-700 line-clamp-2 hover:text-[#009746] transition-colors">
                        {props.name}
                    </h3>
                </Link>

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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    В корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
