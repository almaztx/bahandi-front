import AppRoute from "./components/AppRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto pt-[70px] pb-8">
        <AppRoute />
      </main>
      <Footer />
    </div>
  );
}

export default App;
