import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArticleCardCameras = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/cameras/`, {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        setCameras(res);
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
          <h1 className="text-center text-4xl font-bold text-cyan-700">Cameras</h1>
          <div className="flex flex-wrap justify-start">
            {cameras?.map(camera => (
              <Link
                className="hover:no-underline max-w-sm rounded overflow-hidden outline outline-2 outline-slate-500 mx-auto my-4"
                to={`/detail-article/cameras/${camera._id}`}
                key={camera._id}
              >
                <img className="w-full h-64 object-cover" src={camera.imageUrl} alt="Product Image" />
                <div className="px-6 py-4">
                  <h2 className="font-bold text-xl mb-2">{camera.name}</h2>
                  <p className="text-gray-700 text-base mb-2">{camera.description}</p>
                  <p className="text-gray-700 text-base">
                    prix : <span className="font-bold">{camera.price} €</span>
                  </p>
                </div>
                <div className="px-6 py-2 max-w-sm mx-auto my-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Lentilles disponible :</p>
                  <div className="grid grid-cols-4 gap-2  text-center">
                    {camera.lenses.map(lense => (
                      <div key={lense} className="rounded-full">
                        {lense}
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
