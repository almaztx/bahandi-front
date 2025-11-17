import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = (props) => {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-shadow hover:cursor-pointer">
      <Link to={`/${props.category}/${props.id}`}>
        <img
          src={props.image}
          className="w-full aspect-square bg-gray-200 rounded-xl mb-3 flex items-center justify-center"
        />
        <div className="font-medium text-lg">{props.price} ₸</div>
        <div className="text-sm text-gray-600 mb-3 truncate">{props.name}</div>
      </Link>
      <button
        onClick={() => addToCart(props)}
        className="w-full bg-[#009746] text-white py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;
