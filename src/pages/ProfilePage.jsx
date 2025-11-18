import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();

  // Экран загрузки с Lottie-анимацией
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <iframe
            className="w-80 h-80 md:w-96 md:h-96 mx-auto"
            src="https://lottie.host/embed/41ca193a-0881-4749-abee-8b6918a205ec/ZYXNjZcsim.lottie"
            title="Загрузка профиля"
            allowFullScreen
          ></iframe>
          <p className="mt-6 text-xl text-gray-600 font-medium animate-pulse">
            Загружаем ваш профиль...
          </p>
        </div>
      </div>
    );
  }

  // Если не авторизован — редирект или сообщение
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center from-red-50 to-pink-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Доступ запрещён
          </h2>
          <p className="text-gray-700 mb-8">
            Вы не авторизованы. Пожалуйста, войдите в аккаунт.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl 
                       shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Перейти ко входу
          </Link>
        </div>
      </div>
    );
  }

  // Основной профиль
  return (
    <div className="min-h-screen from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Карточка профиля */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Шапка с градиентом */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Аватар */}
              <div className="relative">
                <img
                  src={
                    user.user_metadata?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.email
                    )}&background=6366f1&color=fff&size=128&bold=true`
                  }
                  alt="Аватар"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                />
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-400 rounded-full border-4 border-white"></div>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">
                  Привет,{" "}
                  {user.user_metadata?.full_name || user.email.split("@")[0]}!
                  👋
                </h1>
                <p className="text-indigo-100 text-lg">Рад видеть тебя снова</p>
              </div>
            </div>
          </div>

          {/* Информация */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </h3>
                <p className="mt-2 text-xl font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  ID пользователя
                </h3>
                <p className="mt-2 text-xl font-mono text-gray-700 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                  {user.id}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Провайдер
                </h3>
                <p className="mt-2 text-xl capitalize text-indigo-600 font-medium">
                  {user.app_metadata?.provider || "email"}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Зарегистрирован
                </h3>
                <p className="mt-2 text-xl text-gray-700">
                  {new Date(user.created_at).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={signOut}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl 
                           shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 
                           transition-all duration-300 flex items-center justify-center gap-3"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Выйти из аккаунта
              </button>

              <Link
                to="/"
                className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl 
                           shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
                На главную
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
