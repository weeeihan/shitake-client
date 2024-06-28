import React, { CSSProperties, useState } from "react";
import Loader from "./Loader";

const Img = ({
  src,
  alt,
  width,
  className,
  style,
  onClick,
}: {
  src: string;
  alt: string;
  width?: number;
  style?: CSSProperties | undefined;
  className: string;
  onClick?: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Loader size={width} />}
      <img
        style={isLoading ? { display: "none" } : style}
        src={src}
        alt={alt}
        width={width}
        className={className}
        onLoad={() => setIsLoading(false)}
        onClick={onClick}
      />
    </>
  );
};

export default Img;
