import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <iframe
        className="mx-auto mt-20 w-96"
        src="https://lottie.host/embed/41ca193a-0881-4749-abee-8b6918a205ec/ZYXNjZcsim.lottie"
      ></iframe>
    );
  }

  // Если не авторизован — кидаем на логин
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если всё ок — показываем страницу
  return children;
}
