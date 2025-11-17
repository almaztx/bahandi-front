import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import supabase from "../utils/supabase";

export default function useProducts(category) {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let query = supabase.from(category).select();

      // фильтр по имени (регистронезависимый ILIKE)
      if (q) {
        query = query.ilike("name", `%${q}%`);
      }

      const { data, error } = await query.order("id", { ascending: true });
      if (!error) setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [category, q]);

  return { products, loading };
}
