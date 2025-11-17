import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import supabase from "../utils/supabase";

export default function DrinksPage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      const { data } = await supabase.from("drinks").select();
      setDrinks(data);
      setLoading(false);
    };
    fetchDrinks();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <main className="grow container mx-auto">
      <h1 className="text-3xl font-bold text-[#009746] my-6">Напитки</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {drinks.map((drink) => (
          <ProductCard
            key={drink.id}
            id={drink.id}
            name={drink.name}
            price={drink.price}
            image={drink.image}
            category={drink.category}
          />
        ))}
      </div>
    </main>
  );
}
