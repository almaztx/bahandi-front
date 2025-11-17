import { useParams, useLocation, Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import supabase from "../utils/supabase";

export default function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const category = location.pathname.split("/")[1]; // burgers | drinks | combo

  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from(category)
        .select()
        .eq("id", id)
        .single();
      if (error) console.error("Ошибка загрузки данных:", error);
      else setItem(data);
    };
    fetchItem();
  }, [id, category]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("id, created_at, comment_text")
        .eq("product_id", id)
        .eq("category", category)
        .order("created_at", { ascending: false });
      if (!error) setComments(data || []);
    };
    fetchComments();
  }, [id, category]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !item) return;

    const { error } = await supabase.from("comments").insert({
      product_id: Number(id),
      category,
      comment_text: newComment.trim(),
    });
    if (error) {
      console.error("Ошибка добавления комментария:", error);
      return;
    }

    setComments((prev) => [
      {
        id: Date.now(),
        created_at: new Date().toISOString(),
        comment_text: newComment.trim(),
      },
      ...prev,
    ]);
    setNewComment("");
  };
  if (!item)
    return (
      <iframe
        className="mx-auto mt-20 w-96"
        src="https://lottie.host/embed/41ca193a-0881-4749-abee-8b6918a205ec/ZYXNjZcsim.lottie"
      ></iframe>
    );
  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <ProductDetailCard
            name={item.name}
            price={item.price}
            image={item.image}
          />
        </div>

        <div className="flex flex-col justify-between">
          <h2 className="text-2xl font-semibold mb-4">Комментарии</h2>

          <section className="flex-1 max-h-[550px] overflow-y-auto pr-2 mb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {comments.length === 0 ? (
              <p className="text-gray-500">Комментариев пока нет.</p>
            ) : (
              <ul className="space-y-3">
                {comments.map((c) => (
                  <li key={c.id} className="border p-3 rounded-lg">
                    <p className="text-gray-800">{c.comment_text}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(c.created_at).toLocaleString()}
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
  );
}
