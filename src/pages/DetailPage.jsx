import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailCard from "../components/ProductDetailCard";

export default function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const category = location.pathname.split("/")[1]; // burgers | drinks | combo

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`https://1c652a22108480ea.mokky.dev/${category}`);
        setItem(res.data[id]);
      } catch {
        console.error("Ошибка при загрузке товара");
      }
    };
    fetchItem();
  }, [id, category]);

  if (!item) return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-16 py-8 mt-16">
        <div className="flex justify-center">
          <ProductDetailCard 
            name={item.name}
            price={item.price}
            img={item.img} />
        </div>
      </main>

      <Footer />
    </div>
    
  );
}