import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import supabase from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

export default function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const category = location.pathname.split("/")[1];

    const [item, setItem] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();

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
                .select("id, created_at, comment_text, user")
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
            user: user.email,
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
                user: user.email,
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
        <main className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <ProductDetailCard
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                </div>

                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Отзывы
                    </h2>

                    <section className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {comments.length === 0 ? (
                            <p className="text-center text-gray-500 py-12 text-lg">
                                Пока нет отзывов. Будьте первым!
                            </p>
                        ) : (
                            comments.map((c) => (
                                <div
                                    key={c.id}
                                    className="flex gap-5 pb-6 border-b border-gray-100 last:border-0"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#009746] to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                        {c.user === user?.email
                                            ? "Я"
                                            : c.user?.[0]?.toUpperCase() || "А"}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-1">
                                            {c.user === user?.email
                                                ? "Вы"
                                                : c.user || "Аноним"}
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            {c.comment_text}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-3">
                                            {new Date(
                                                c.created_at
                                            ).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>

                    {user ? (
                        <form
                            onSubmit={handleAddComment}
                            className="mt-8 flex flex-col gap-4"
                        >
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Напишите свой отзыв..."
                                required
                                rows={4}
                                className="w-full rounded-2xl border border-gray-300 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#009746]/30 focus:border-[#009746] resize-none transition-all shadow-md"
                            />
                            <button
                                type="submit"
                                className="self-end bg-[#009746] hover:bg-green-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Отправить
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8 p-8 bg-gray-50 rounded-3xl text-center border border-dashed border-gray-300">
                            <p className="text-xl text-gray-700 mb-6">
                                Войдите, чтобы оставить отзыв
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-[#009746] hover:bg-green-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                            >
                                Войти в аккаунт
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #00974640;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #00974660;
                }
            `}</style>
        </main>
    );
}
