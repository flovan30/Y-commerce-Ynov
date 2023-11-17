import { useEffect } from "react";

import { Navbar } from "../components/Navbar";

export default function Accueil() {
  useEffect(() => {
    document.title = "Commerce | Accueil";
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-center text-2xl font-bold">Accueil</h1>
    </>
  );
}
