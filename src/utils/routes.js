import HomePage from "../pages/HomePage";
import DrinksPage from "../pages/DrinksPage";
import ComboPage from "../pages/ComboPage";
import DetailPage from "../pages/DetailPage";

import { HOME_PAGE, DRINKS_PAGE, COMBOS_PAGE, BURGER_DETAIL_PAGE, DRINKS_DETAIL_PAGE, COMBOS_DETAIL_PAGE } from "./consts";

export const routes = [
    {
        path: HOME_PAGE,
        element: HomePage
    },
    {
        path: DRINKS_PAGE,
        element: DrinksPage
    },
    {
        path: COMBOS_PAGE,
        element: ComboPage
    },
    {
        path: BURGER_DETAIL_PAGE,
        element: DetailPage
    },
    {
        path: DRINKS_DETAIL_PAGE,
        element: DetailPage
    },
    {
        path: COMBOS_DETAIL_PAGE,
        element: DetailPage
    },
]