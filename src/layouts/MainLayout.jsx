import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto pt-[70px] pb-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
