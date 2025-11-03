import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
// import { drinks } from ".././data.js";

export default function DrinksPage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(
          "https://1c652a22108480ea.mokky.dev/drinks"
        );
        setDrinks(response.data);
      } catch (err) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-16 py-8 mt-16">
        <h1 className="text-3xl font-bold text-[#009746] mb-8">Напитки</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drinks.map((drink, index) => (
            <ProductCard
              key={index}
              id={index}
              name={drink.name}
              price={drink.price}
              img={drink.img}
              category="drinks"
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
