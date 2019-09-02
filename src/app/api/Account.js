import axios from "axios";
import { storageRef } from "../lib/firebase";
import config from "../utils/config";
import { openNotification } from "../utils/General";

const message = "Send -> ";
const descriptionOk = "Status: OK";
const iconOk = "smile";
const descriptionError = "Status: Error";
const iconError = "frown";

export const putDetailsRestaurant = profileDetails => {
  const restaurantId = localStorage.getItem("restaurantId");
  const token = localStorage.getItem("token");
  const body = profileDetails;
  axios
    .put(`${config.baseUrl}/restaurants/${restaurantId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("response edit details restaurant:", res.data);
      openNotification(message, descriptionOk, iconOk);
      return true;
    })
    .catch(err => {
      console.log("errrr edit details restaurant:", err.response);
      openNotification(message, descriptionError, iconError);
      return false;
    });
};

export const postDetailsRestaurant = profileDetails => {
  const body = profileDetails;
  const token = localStorage.getItem("token");
  axios
    .post(`${config.baseUrl}/restaurants`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("response initial details request", res.data);
      openNotification(message, descriptionOk, iconOk);
      localStorage.setItem("restaurantId", res.data.id);
      return true;
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("errr initial:", err.response);
      return false;
    });
};

export const getDetailsRestaurant = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/restaurants/owned`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      localStorage.setItem("restaurantId", res.data.id);
      return res.data;
    })
    .catch(err => {
      console.log("errrr:", err);
    });
  //return data;
};

export const getUrlImagesFromFirebase = async (newImagesUrl, fileList) => {
  const newImages = newImagesUrl;
  fileList.forEach(async item => {
    getBase64(item.originFileObj, async base64 => {
      const response = await storageRef
        .child(`images/${item.uid}.${item.type.split("/")[1]}`)
        .putString(base64.split("base64,")[1], "base64");
      const imageUrl = await response.task.snapshot.ref.getDownloadURL();
      newImages.push(imageUrl);
    });
  });
  return newImages;
};

export const getUrlImageFromFirebase = async (imageBase64, file) => {
  if (!file || !getBase64) return;
  const response = await storageRef
    .child(`images/${file.uid}.${file.type.split("/")[1]}`)
    .putString(imageBase64.split("base64,")[1], "base64");
  const logoUrl = await response.task.snapshot.ref.getDownloadURL();
  return logoUrl;
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const putEmailAndPasswordApi = (email, password) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  axios
    .put(
      `${config.baseUrl}/users/${userId}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log(res.data);
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("error put email:", err);
    });
  axios
    .put(
      `${config.baseUrl}/users/${userId}/change-password`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      console.log("res data from putEmailAndPassword", res.data);
    })
    .catch(err => {
      console.log("error put password:", err);
    });
};

export const getEmailApi = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("res getEmailApi:", res);
      return res.data;
    })
    .catch(err => {
      console.log("error getEmailApi:", err);
    });
};

export const getDetailsRestaurantApi = () => {
  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");
  return axios
    .get(`${config.baseUrl}/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};
