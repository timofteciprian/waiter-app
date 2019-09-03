import axios from "axios";
import config from "../utils/config";
import { openNotification } from "../utils/General";

const message = "Sent ";
const descriptionOk = "Status: OK";
const iconOk = "smile";
const descriptionError = "Status: Error";
const iconError = "frown";

export const login = async (email, password) => {
  const apiUrl = `${config.baseUrl}/auth`;
  return axios
    .post(
      apiUrl,
      {},
      {
        auth: {
          username: email,
          password: password
        }
      }
    )
    .then(res => {
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("restaurantId", res.data.user.restaurantId);
      return true;
    })
    .catch(err => {
      openNotification(message, descriptionError, iconError);
      console.log("error login:", err);
      return false;
    });
};

export const register = async (email, password, role) => {
  try {
    const res = await axios.post(`${config.baseUrl}/users`, {
      email,
      password,
      role
    });
    localStorage.setItem("userId", res.data.id);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    const loggedIn = await login(email, password);
    return loggedIn;
  } catch (e) {
    openNotification(message, descriptionError, iconError);
    console.log("Error @ register:", e);
  }
};
export const forgotPasswordApi = async email => {
  try {
    const res = await axios.post(
      `${config.baseUrl}/users/updateForgotPassword`,
      {
        email
      }
    );
    if (res) openNotification(message, descriptionOk, iconOk);
    return true;
  } catch (e) {
    openNotification(message, descriptionError, iconError);
    console.log("Error @ register:", e);
    return false;
  }
};
