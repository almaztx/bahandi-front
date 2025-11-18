import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если не авторизован — кидаем на логин
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если всё ок — показываем страницу
  return children;
}
