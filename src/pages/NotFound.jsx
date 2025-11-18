import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bg from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        {/* Большая 404 с анимацией пульсации */}
        <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text animate-pulse-slow">
          404
        </h1>

        {/* Подзаголовок с появлением */}
        <p className="mt-6 text-2xl md:text-3xl font-medium text-gray-700 animate-slideUp">
          Ой! Страница не найдена
        </p>

        <p className="mt-4 text-lg text-gray-500 animate-slideUp animation-delay-200">
          Возможно, она ушла на перерыв или никогда здесь не была...
        </p>

        {/* Кнопка домой с hover-анимацией */}
        <Link
          to="/"
          className="inline-block mt-10 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg rounded-xl
                     shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 
                     transition-all duration-300"
        >
          Вернуться на главную
        </Link>

        {/* Декоративные плавающие частицы (опционально, но красиво) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
