import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

export default function Panier() {
  useEffect(() => {
    document.title = "Commerce | Panier";
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Récupérer les articles du localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(storedCart);

    // faire une requête pour récupérer le prix de chaque article
    const fetchCartItems = async () => {
      const promises = storedCart.map(async item => {
        const res = await fetch(`http://localhost:3000/api/${item.type}/${item.id}`);
        const data = await res.json();

        // total ttc de tout le panier
        setTotal(prixTTC => prixTTC + data.price * item.quantity);
        return { ...item, price: data.price };
      });
      const items = await Promise.all(promises);
      setCartItems(items);
    };
    fetchCartItems();
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = itemId => {
    // Retirer l'article du panier
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    // Mettre à jour le localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const HandleOrder = e => {
    e.preventDefault();
    useEffect(() => {
      const order = {
        contact: {
          firstName: "John",
          lastName: "Doe",
          address: "5 rue de la Paix",
          city: "Paris",
          email: "",
        },
        products: cartItems.map(item => item.id),
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      };
      // envoie de la commande sur le serveur
      fetch(`http://localhost:3000/api/${cartItems}/order`, requestOptions)
        .then(response => response.json())
        .then(localStorage.clear);
    }, []);
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="max-w-screen-xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6">Mon Panier</h1>

          {cartItems.length === 0 ? (
            <div className="text-center text-xl font-bold my-8">Votre panier est vide</div>
          ) : (
            <>
              <ul className="divide-y divide-gray-300">
                {cartItems.map(item => (
                  <li key={item.id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <strong className="text-lg">{item.name}</strong>
                        {item.type === "teddies" && <div className="text-gray-600">Couleur : {item.option}</div>}
                        {item.type === "cameras" && <div className="text-gray-600">Lentille : {item.option}</div>}
                        {item.type === "furniture" && <div className="text-gray-600">Vernis : {item.option}</div>}
                        <div className="text-gray-600">Quantité: {item.quantity}</div>
                      </div>
                      <div className="flex items-center">
                        {/* affichage du prix total de l'item avec toLocaleString */}
                        <div className="text-gray-600 font-semibold">
                          {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center mt-8">
                <div className="text-xl font-bold">Total : {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</div>
              </div>
              <div className={"my-20"}>
                <button
                  onClick={HandleOrder}
                  className="block w-2/5 m-auto  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Passer commande
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
