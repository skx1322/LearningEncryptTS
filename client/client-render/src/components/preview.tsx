import { useEffect, useState } from "react";
import SummaryApi, { baseURL } from "../common/API";
import { useParams } from "react-router-dom";

export function PreviewImage() {
  const [isZoomed, setIsZoomed] = useState(false);

  const { storage, folder, imageID } = useParams();

  useEffect(() => {
    document.title = imageID || "Preview";
  }, [imageID]);

  const imageSrc = new URL(
    `${SummaryApi.imagePreview.url}/${storage}/${folder}/${imageID}`,
    baseURL
  ).toString();

  return (
    <div className="flex items-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageID}
          className={`overflow-y-scroll transition-transform duration-300 cursor-pointer ${
            isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      ) : null}
    </div>
  );
}
