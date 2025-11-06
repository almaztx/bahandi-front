import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

const ProductDetailCard = (props) => {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-shadow hover:cursor-pointer">
      <img
        src={props.img}
        className=" aspect-square bg-gray-200 rounded-xl mb-3 flex items-center justify-center mx-auto"
      />
      <div className="font-bold text-lg">{props.price} ₸</div>
      <div className="text-sm text-gray-600 mb-3">{props.name}</div>
      <button
        onClick={() => addToCart(props)}
        className="w-full bg-[#009746] text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductDetailCard;
