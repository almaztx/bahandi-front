import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
// import { burgers } from ".././data.js";

//useEffect - Запускать код при загрузке или обновлении компонента (например, загрузить данные)

export default function HomePage() {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const response = await axios.get(
          "https://1c652a22108480ea.mokky.dev/burgers"
        );
        setBurgers(response.data);
      } catch (err) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };
    fetchBurgers();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-16 py-8 mt-16">
        <h1 className="text-[#009746] text-3xl font-bold mb-8">Бургеры</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {burgers.map((burger, index) => (
            <ProductCard
              key={index}
              name={burger.name}
              price={burger.price}
              img={burger.img}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
