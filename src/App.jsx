import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DrinksPage from "./pages/DrinksPage";
import ComboPage from "./pages/ComboPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/combo" element={<ComboPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
