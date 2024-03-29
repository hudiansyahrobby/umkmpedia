import React from "react";
import LazyLoad from "react-lazyload";
import { generatePublicPath } from "../../utils/generatePublicPath";
import FavoriteButton from "../Buttons/FavoriteButton";

export default function ProductImage({
  image,
  name,
  favorited,
  onClick,
  user,
  quantity,
}) {
  return (
    <div className="h-56 md:h-40 relative">
      {/* <LazyLoad once> */}
      <img
        className={`w-full h-full ${quantity <= 0 && "opacity-50"}`}
        src={generatePublicPath(image)}
        alt={name}
      />
      {/* </LazyLoad> */}

      {quantity <= 0 && (
        <h1 className="absolute top-0 left-0 p-1 bg-red-600 text-white text-sm">
          Habis
        </h1>
      )}
      {user?.role !== "admin" && (
        <FavoriteButton
          onClick={onClick}
          favorited={favorited}
          absolute
          size="2rem"
        />
      )}
    </div>
  );
}
