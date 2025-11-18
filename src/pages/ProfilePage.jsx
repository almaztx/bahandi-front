import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <p>Загрузка...</p>;
  if (!user) return <p>Вы не авторизованы</p>;

  return (
    <div>
      <h1>Привет, {user.email}!</h1>
      <p>ID: {user.id}</p>
      <button onClick={signOut}>Выйти</button>
    </div>
  );
}
