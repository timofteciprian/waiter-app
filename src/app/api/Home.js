import axios from "axios";
import config from "../utils/config";

export const getReservationsApi = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/reservations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.log("err getReservation:", err);
    });
};

export const getOrderApi = async id => {
  const token = localStorage.getItem("token");
  let res = await axios.get(`${config.baseUrl}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
