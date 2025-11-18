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
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Товары не найдены</p>
      </div>
    );

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#009746] mb-8 text-center md:text-left">
        Комбо
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
