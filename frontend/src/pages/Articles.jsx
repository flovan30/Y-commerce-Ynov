import { useEffect } from "react";
import { Navbar } from "../components/Navbar";

import { ArticleCardTeddies } from "../components/ArticlesCardTeddies";
import { ArticleCardCameras } from "../components/ArticlesCardCameras";
import { ArticleCardfurnitures } from "../components/ArticlesCardfurnitures";

export default function Articles() {
  useEffect(() => {
    document.title = "Commerce | Article";
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-8">
        <h1 className="text-center text-4xl font-bold my-5">Articles</h1>
        <ArticleCardTeddies />
        <hr className="my-4 border-t border-gray-700" />
        <ArticleCardCameras />
        <hr className="my-4 border-t border-gray-700" />
        <ArticleCardfurnitures />
      </div>
    </>
  );
}
