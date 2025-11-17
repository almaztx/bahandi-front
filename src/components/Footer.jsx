export default function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white px-25 py-10 flex justify-between">
      <div className="">
        <div className="grid grid-cols-2 gap-30">
          <div className="pt-10">
            <h2 className="text-2xl font-bold mb-3">BAHANDI</h2>
            <p className="text-gray-400 text-sm">
              © 2026 ТОО Баханди. Все права не защищены
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Компания</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Франшиза
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Вакансии
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Оферта
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Карта сайта
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div></div>
    </footer>
  );
}
