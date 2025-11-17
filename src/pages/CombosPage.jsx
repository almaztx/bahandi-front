import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function HomePage() {
  const { products: combos, loading } = useProducts("combos");

  if (loading)
    return (
      <iframe
        className="mx-auto mt-20 w-96"
        src="https://lottie.host/embed/5d900e52-987d-4e35-af79-16f33536f723/qCD2TRMo6y.lottie"
      ></iframe>
    );
  if (!combos.length)
    return <p className="text-center mt-10 text-gray-500">Ничего не найдено</p>;

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
