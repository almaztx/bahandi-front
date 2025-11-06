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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `https://1c652a22108480ea.mokky.dev/${category}`
        );
        setItem(res.data[id]);
      } catch {
        console.error("Ошибка при загрузке товара");
      }
    };
    fetchItem();
  }, [id, category]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `https://1c652a22108480ea.mokky.dev/comments`
      );
      const productComments = res.data.filter(
        (c) => c.productId === Number(id) && c.category === category
      );
      setComments(productComments);
    };
    fetchComments();
  }, [id, category]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      productId: Number(id),
      category,
      author: "Пользователь",
      text: newComment,
      date: new Date().toISOString(),
    };

    await axios.post(
      `https://1c652a22108480ea.mokky.dev/comments`,
      commentData
    );
    setComments((prev) => [...prev, commentData]);
    setNewComment("");
  };

  if (!item) return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container mx-auto px-16 py-8 mt-16">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <ProductDetailCard
              name={item.name}
              price={item.price}
              img={item.img}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-4">Комментарии</h2>

            <section className="flex-1 max-h-[550px] overflow-y-auto pr-2 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {comments.length === 0 ? (
                <p className="text-gray-500">Комментариев пока нет.</p>
              ) : (
                <ul className="space-y-3">
                  {comments.map((c, i) => (
                    <li key={i} className="border p-3 rounded-lg">
                      <p className="text-gray-800">{c.text}</p>
                      <div className="text-sm text-gray-500 mt-1">
                        {c.author} — {new Date(c.date).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <form onSubmit={handleAddComment} className="flex gap-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Оставьте комментарий..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-green-300 resize-none h-13"
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
