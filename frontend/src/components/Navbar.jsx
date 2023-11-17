import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to={"/"} className="text-white text-lg font-bold">
            Y-Commerce
          </Link>

          <ul className="flex space-x-4">
            <li>
              <Link to={"/"}>Accueil</Link>
            </li>
            <li>
              <Link to={"/articles"}>Articles</Link>
            </li>
            <li>
              <Link to={"/panier"}>Votre panier</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
