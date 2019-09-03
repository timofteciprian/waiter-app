import axios from "axios";
import config from "../utils/config";
import { openNotification } from "../utils/General";

const message = "Sent ";
const descriptionOk = "Status: OK";
const iconOk = "smile";
const descriptionError = "Status: Error";
const iconError = "frown";

export const postCategory = name => {
  const token = localStorage.getItem("token");
  return axios
    .post(
      `${config.baseUrl}/food-categories`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log("response ok post category", res);
      return res.data;
    })
    .catch(err => {
      console.log("errrr post category:", err.response);
    });
};

export const getDataCategories = newCategories => {
  const restaurantId = localStorage.getItem("restaurantId");
  const token = localStorage.getItem("token");
  const newCateg = newCategories;
  return axios
    .get(`${config.baseUrl}/food-categories/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const categories = res.data;
      console.log(categories);
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i].name;
        const id = categories[i].id;
        newCateg.push({ category, id });
      }
      return newCateg;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postFoodItem = item => {
  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");
  const { categoryId, title, description, price, image, weight } = item;
  axios
    .post(
      `${config.baseUrl}/food-items`,
      {
        categoryId,
        title,
        description,
        price,
        image,
        weight,
        restaurantId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log("ok:", res.data);
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log(err);
    });
};

export const getFoodMenu = () => {
  const restaurantId = localStorage.getItem("restaurantId");
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/menu/${restaurantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const putStatusApi = (newStatus, id) => {
  const token = localStorage.getItem("token");
  axios
    .put(
      `${config.baseUrl}/food-items/${id}/update-status`,
      { status: newStatus },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log("res putStatusApi:", res.data);
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("errrr putStatusApi:", err);
    });
};
export const createTableApi = (name, nrSeats, location) => {
  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");
  return axios
    .post(
      `${config.baseUrl}/tables`,
      { name, nrSeats, location, restaurantId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log("res createTableApi:", res.data);
      return res.data;
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("errrr createTableApi:", err);
    });
};
export const getTableApi = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/tables`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log("res putTableApi:", res.data);
      return res.data;
    })
    .catch(err => {
      console.log("errrr putTableApi:", err);
    });
};
export const putTableApi = async (id, name, location, nrSeats) => {
  const token = localStorage.getItem("token");
  const restaurantId = localStorage.getItem("restaurantId");
  axios
    .put(
      `${config.baseUrl}/tables/${id}`,
      {
        name,
        location,
        nrSeats,
        restaurantId
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    .then(res => {
      openNotification(message, descriptionOk, iconOk);
      console.log("res putTableApi:", res.data);
      return res.data;
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("errrr putTableApi:", err);
    });
};
export const deleteTableApi = id => {
  const token = localStorage.getItem("token");
  axios
    .delete(`${config.baseUrl}/tables/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log("res deleteTableApi:", res.data);
    })
    .catch(err => {
      console.log("errrr deleteTableApi:", err);
    });
};
