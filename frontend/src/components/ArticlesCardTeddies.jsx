import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArticleCardTeddies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teddies, setTeddies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/teddies/`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        setTeddies(res);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
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
        <>
          <h1 className="text-center text-4xl font-bold text-cyan-700">Peluche</h1>
          <div className="flex flex-wrap justify-start">
            {teddies?.map(teddie => (
              <Link
                className="hover:no-underline max-w-sm rounded overflow-hidden outline outline-2 outline-slate-500 mx-auto my-4"
                to={`/detail-article/teddies/${teddie._id}`}
                key={teddie._id}
              >
                <img className="w-full h-64 object-cover" src={teddie.imageUrl} alt="Product Image" />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">{teddie.name}</h2>
                  <p className="text-gray-700 text-base mb-2">{teddie.description}</p>
                  <p className="text-gray-700 text-base">
                    prix : <span className="font-bold">{teddie.price} €</span>
                  </p>
                </div>
                {/* boucle pour les couleur  */}
                <div className="px-6 py-2 max-w-sm mx-auto my-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Couleur disponible :</p>
                  <div className="grid grid-cols-4 gap-2  text-center">
                    {teddie.colors.map(color => (
                      <div key={color} className="rounded-full">
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};
