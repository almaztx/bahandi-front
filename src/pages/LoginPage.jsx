import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await signUp(email, password);
        alert("Регистрация успешна! Проверьте почту.");
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Заголовок */}
        <h2 className="text-mt-2 text-3xl font-bold text-center text-gray-900 mb-8">
          {isRegister ? "Создать аккаунт" : "С возвращением!"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                     text-gray-900 placeholder-gray-400 transition duration-200 outline-none"
            />
          </div>

          {/* Пароль */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                     text-gray-900 placeholder-gray-400 transition duration-200 outline-none"
            />
          </div>

          {/* Кнопка входа/регистрации */}
          <button
            type="submit"
            className="w-full bg-[#009746] hover:bg-green-700 text-white font-semibold py-3.5 rounded-lg 
                   transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg cursor-pointer"
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        {/* Переключатель вход/регистрация */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 hover:text-indigo-700 font-medium transition cursor-pointer"
          >
            {isRegister ? "У меня уже есть аккаунт" : "Нет аккаунта? Создать"}
          </button>
        </div>

        {/* Разделитель */}
        <div className="mt-8 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">или</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Кнопка Google */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-6 w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 
                 font-semibold py-3.5 rounded-lg flex items-center justify-center gap-3 
                 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Войти через Google
        </button>
      </div>
    </div>
  );
}
