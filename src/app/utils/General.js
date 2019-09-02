import React from "react";
import { notification, Icon } from "antd";
import "../css/ResponsiveImage.css";

export const openNotification = (message, description, icon) => {
  notification.open({
    message: message,
    description: description,
    duration: 2,
    icon: <Icon type={`${icon}`} style={{ color: "#108ee9" }} />
  });
};

export function ResponsiveImage({ src, width, height }) {
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
