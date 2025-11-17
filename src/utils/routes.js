import HomePage from "../pages/HomePage";
import DrinksPage from "../pages/DrinksPage";
import CombosPage from "../pages/CombosPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";

import {
  HOME_PAGE,
  DRINKS_PAGE,
  COMBOS_PAGE,
  BURGER_DETAIL_PAGE,
  DRINKS_DETAIL_PAGE,
  COMBOS_DETAIL_PAGE,
  CART_PAGE,
} from "./consts";

export const routes = [
  {
    path: HOME_PAGE,
    element: HomePage,
  },
  {
    path: DRINKS_PAGE,
    element: DrinksPage,
  },
  {
    path: COMBOS_PAGE,
    element: CombosPage,
  },
  {
    path: BURGER_DETAIL_PAGE,
    element: DetailPage,
  },
  {
    path: DRINKS_DETAIL_PAGE,
    element: DetailPage,
  },
  {
    path: COMBOS_DETAIL_PAGE,
    element: DetailPage,
  },
  {
    path: CART_PAGE,
    element: CartPage,
  },
];
