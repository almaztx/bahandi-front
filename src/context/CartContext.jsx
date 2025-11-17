import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id, name, price, image } = action.payload;
      const exist = state.find((i) => i.id === id);
      if (exist) {
        return state.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { id, name, price, image, qty: 1 }];
    }
    case "REMOVE": {
      return state.filter((i) => i.id !== action.payload);
    }
    case "CLEAR":
      return [];
    case "INCREMENT": {
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      );
    }
    case "DECREMENT": {
      return state.map((i) =>
        i.id === action.payload && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i
      );
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: "ADD", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const increment = (id) => dispatch({ type: "INCREMENT", payload: id });
  const decrement = (id) => dispatch({ type: "DECREMENT", payload: id });

  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    increment,
    decrement,
    totalPrice,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart внутри CartProvider");
  return ctx;
}
