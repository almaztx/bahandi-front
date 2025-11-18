import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await signUp(email, password);
        alert("Регистрация успешна! Проверьте почту.");
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Регистрация" : "Вход"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>

      <button type="button" onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "У меня уже есть аккаунт" : "Создать аккаунт"}
      </button>

      <button
        type="button"
        onClick={signInWithGoogle}
        style={{ marginTop: "10px" }}
      >
        Войти через Google
      </button>
    </div>
  );
}
