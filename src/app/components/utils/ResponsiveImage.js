import React from "react";
import "../../css/ResponsiveImage.css";

function ResponsiveImage({ src, width, height }) {
  return (
    <div
      style={{
        width
      }}
      className="responsive-image"
    >
      <div
        style={{
          paddingBottom: (height / width) * 100 + "%"
        }}
      />
      <img className="responsive-image__image" alt="imageLogin" src={src} />
    </div>
  );
}

export default ResponsiveImage;
