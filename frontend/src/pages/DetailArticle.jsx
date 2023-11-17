import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

export default function DetailArticle() {
  const { idArticle, typeArticle } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleQuantityChange = value => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleAddToCart = e => {
    e.preventDefault();
    if (!selectedOption) {
      return;
    }
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item._id && cartItem.option === selectedOption);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: item._id,
        type: typeArticle,
        name: item.name,
        quantity: quantity,
        option: selectedOption,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/${typeArticle}/${idArticle}`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        setItem(res);
        setIsLoading(false);
      });
  }, [idArticle, typeArticle]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="mr-2 text-xl font-bold">Loading </p>
          <div className="flex space-x-2">
            <div className="bg-blue-500 mt-2 h-4 w-4 rounded-full animate-bounce"></div>
            <div className="bg-blue-500 mt-2 h-4  w-4 rounded-full animate-bounce duration-200"></div>
            <div className="bg-blue-500 mt-2 h-4 w-4 rounded-full animate-bounce duration-500"></div>
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto mt-8 flex">
          <div className="flex-shrink-0 w-1/2">
            <img className="w-full h-auto" src={item.imageUrl} alt="Product Image" />
          </div>
          <div className="flex-grow p-8">
            <h2 className="font-bold text-3xl mb-4">{item.name}</h2>
            <p className="text-gray-700 text-lg mb-6">{item.description}</p>
            <p className="text-gray-700 text-lg mb-6">
              Prix: <span className="font-bold">{item.price} €</span>
            </p>
            <form>
              <div className="mb-6 flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-2">Quantité:</label>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                >
                  +
                </button>
              </div>
              <div className="mb-6">
                {typeArticle === "teddies" && (
                  <>
                    <label className="text-sm font-medium text-gray-700 mr-2">Couleur :</label>
                    <select value={selectedOption} required onChange={handleOptionChange} className="border border-gray-300 rounded-md p-2">
                      <option value="" disabled>
                        Sélectionnez une couleur
                      </option>
                      {item.colors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {typeArticle === "cameras" && (
                  <>
                    <label className="text-sm font-medium text-gray-700 mr-2">Lentille :</label>
                    <select value={selectedOption} required onChange={handleOptionChange} className="border border-gray-300 rounded-md p-2">
                      <option value="" disabled>
                        Sélectionnez une lentille
                      </option>
                      {item.lenses.map((lens, index) => (
                        <option key={index} value={lens}>
                          {lens}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {typeArticle === "furniture" && (
                  <>
                    <label className="text-sm font-medium text-gray-700 mr-2">vernis :</label>
                    <select value={selectedOption} required onChange={handleOptionChange} className="border border-gray-300 rounded-md p-2">
                      <option value="" disabled>
                        Sélectionnez un vernis
                      </option>
                      {item.varnish.map((varnish, index) => (
                        <option key={index} value={varnish}>
                          {varnish}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
              <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Ajouter au panier
              </button>
            </form>
          </div>
        </div>
      )}
      {showMessage && <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">L&apos;article a été ajouté au panier</div>}
    </>
  );
}
