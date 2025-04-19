import React, { useEffect, useState } from "react";
import { Skeleton } from "./skeleton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  lowResSrc?: string;
  highResSrc: string;
  fallbackSrc?: string;
  loaderClassName?: string;
  imgClassName?: string;
}

const Image: React.FC<ImageProps> = ({
  lowResSrc,
  highResSrc,
  fallbackSrc = "https://via.placeholder.com/150?text=Image+Error",
  alt = "image",
  loaderClassName = "w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin",
  imgClassName = "object-cover w-full h-full",
  ...rest
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadImage = () => {
      setLoading(true);
      setError(false);

      if (lowResSrc) {
        const lowImg = new window.Image();
        lowImg.src = lowResSrc;

        lowImg.onload = () => {
          setSrc(lowResSrc);
          setLoading(false);
          loadHighResOnly();
        };

        lowImg.onerror = () => {
          loadHighResOnly();
        };
      } else {
        loadHighResOnly();
      }
    };

    const loadHighResOnly = () => {
      const highImg = new window.Image();
      highImg.src = highResSrc;

      highImg.onload = () => {
        setSrc(highResSrc);
        setLoading(false);
      };

      highImg.onerror = () => {
        setLoading(false);
        setError(true);
      };
    };

    loadImage();
  }, [lowResSrc, highResSrc]);

  if (loading) {
    return <Skeleton className="w-full h-full rounded-sm" />;
  }

  if (error) {
    return (
      <img src={fallbackSrc} alt="error" className={imgClassName} {...rest} />
    );
  }

  return (
    <img
      src={src!}
      alt={alt}
      loading="lazy"
      className={`object-cover w-full h-full ${imgClassName}`}
      {...rest}
    />
  );
};

export default Image;
