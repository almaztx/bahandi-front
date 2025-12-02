import MainLayout from "../layouts/MainLayout";
import SecondLayout from "../layouts/SecondLayout";

import HomePage from "../pages/HomePage";
import DrinksPage from "../pages/DrinksPage";
import CombosPage from "../pages/CombosPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";

import GetUsersPage from "../pages/GetUsersPage";
import CreateUserPage from "../pages/CreateUserPage";

import LoginForm from "../pages/LoginForm";
import Profile from "../pages/Profile";
import SignupForm from "../pages/SignupForm";

import {
    HOME_PAGE,
    DRINKS_PAGE,
    COMBOS_PAGE,
    BURGER_DETAIL_PAGE,
    DRINKS_DETAIL_PAGE,
    COMBOS_DETAIL_PAGE,
    CART_PAGE,
    NOT_FOUND_PAGE,
    LOGIN_PAGE,
    PROFILE_PAGE,
    LOGIN_FORM,
    PROFILE,
    SIGNUP_FORM,
} from "./consts";

export const routes = [
    {
        element: MainLayout,
        children: [
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
        ],
    },

    {
        element: SecondLayout,
        children: [
            {
                path: NOT_FOUND_PAGE,
                element: NotFound,
            },
            {
                path: LOGIN_PAGE,
                element: LoginPage,
            },
            {
                path: PROFILE_PAGE,
                element: () => (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: LOGIN_FORM,
                element: LoginForm,
            },
            {
                path: PROFILE,
                element: Profile,
            },
            {
                path: SIGNUP_FORM,
                element: SignupForm,
            },
        ],
    },
];
