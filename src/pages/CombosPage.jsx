import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import supabase from "../utils/supabase";

export default function CombosPage() {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombos = async () => {
      const { data } = await supabase.from("combos").select();
      setCombos(data);
      setLoading(false);
    };
    fetchCombos();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  return (
    <main className="grow container mx-auto">
      <h1 className="text-3xl font-bold text-[#009746] my-6">Комбо</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {combos.map((combo) => (
          <ProductCard
            key={combo.id}
            id={combo.id}
            name={combo.name}
            price={combo.price}
            image={combo.image}
            category={combo.category}
          />
        ))}
      </div>
    </main>
  );
}
