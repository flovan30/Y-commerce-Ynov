import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Accueil from "./pages/Accueil";
import Articles from "./pages/Articles";
import Commande from "./pages/Commande";
import DetailArticle from "./pages/DetailArticle";
import Panier from "./pages/Panier";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/commande" element={<Commande />} />
        <Route path="/detail-article/:typeArticle/:idArticle" element={<DetailArticle />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
