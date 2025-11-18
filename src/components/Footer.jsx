export default function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white">
      <div className="container mx-auto px-6 py-12 md:py-16 lg:px-25">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-30">
          {/* Левая колонка — логотип и копирайт */}
          <div className="lg:pt-10 order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">BAHANDI</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              © 2026 ТОО Баханди. Все права не защищены
            </p>
          </div>

          {/* Центральная колонка — ссылки */}
          <div className="order-3 md:order-2">
            <h3 className="font-semibold text-lg mb-5">Компания</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Франшиза
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Вакансии
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Оферта
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Карта сайта
                </a>
              </li>
              <li>
                <a href="*" className="hover:text-white transition">
                  Страница 404
                </a>
              </li>
            </ul>
          </div>

          {/* Пустое место справа — остаётся только на десктопе */}
          <div className="hidden lg:block order-3"></div>
        </div>
      </div>
    </footer>
  );
}
