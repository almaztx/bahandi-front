import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DrinksPage from "./pages/DrinksPage";
import ComboPage from "./pages/ComboPage";
import DetailPage from "./pages/DetailPage";
import AppRoute from "./components/AppRoute";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/drinks" element={<DrinksPage />} />
    //     <Route path="/combos" element={<ComboPage />} />
    //     <Route path="/burgers/:id" element={<DetailPage />} />
    //     <Route path="/drinks/:id" element={<DetailPage />} />
    //     <Route path="/combos/:id" element={<DetailPage />} />
    //   </Routes>
    // </BrowserRouter>
    <AppRoute />
  );
}

export default App;
