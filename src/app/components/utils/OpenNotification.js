import React from "react";
import { notification, Icon } from "antd";

const openNotification = (message, description, icon) => {
  notification.open({
    message: message,
    description: description,
    icon: <Icon type={`${icon}`} style={{ color: "#108ee9" }} />
  });
};

export default openNotification;
