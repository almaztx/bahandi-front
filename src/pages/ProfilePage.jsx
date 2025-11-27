import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function ProfilePage() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 text-gray-600">
                        <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                        <span className="text-lg font-medium">
                            Загрузка профиля...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Профиль пользователя
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Добро пожаловать,{" "}
                        {user.user_metadata?.full_name ||
                            user.email.split("@")[0]}
                    </p>
                </div>

                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-8 py-10">
                        <div className="flex items-center gap-6 mb-10">
                            <img
                                className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                                src={
                                    user.user_metadata?.avatar_url ||
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.email
                                    )}&background=6366f1&color=fff&size=128&bold=true`
                                }
                                alt="Аватар"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {user.user_metadata?.full_name ||
                                        user.email.split("@")[0]}
                                </h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-base text-gray-900">
                                        {user.email}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Способ входа
                                    </dt>
                                    <dd className="mt-mt-1 text-base text-gray-900 capitalize">
                                        {user.app_metadata?.provider || "email"}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        ID пользователя
                                    </dt>
                                    <dd className="mt-1 font-mono text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-md">
                                        {user.id}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">
                                        Дата регистрации
                                    </dt>
                                    <dd className="mt-1 text-base text-gray-900">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString("ru-RU", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={signOut}
                                className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg 
                           transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Выйти из аккаунта
                            </button>

                            <Link
                                to="/"
                                className="w-full sm:w-auto px-6 py-3 text-center border border-gray-300 text-gray-700 font-medium rounded-lg 
                           hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                На главную
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-500">
                    © 2025 Ваше приложение. Все права защищены.
                </p>
            </div>
        </div>
    );
}
