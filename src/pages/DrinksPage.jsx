import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function HomePage() {
  const { products: drinks, loading } = useProducts("drinks");

  if (loading)
    return (
      <iframe
        className="mx-auto mt-20 w-96"
        src="https://lottie.host/embed/5d900e52-987d-4e35-af79-16f33536f723/qCD2TRMo6y.lottie"
      ></iframe>
    );
  if (!drinks.length)
    return <p className="text-center mt-10 text-gray-500">Ничего не найдено</p>;

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
