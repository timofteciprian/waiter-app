import axios from "axios";
import config from "../utils/config";

export const getReservationsApi = () => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${config.baseUrl}/reservations/owned`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      return res.data;
    });
};

export const getOrderApi = async id => {
  const token = localStorage.getItem("token");
  let res = await axios.get(
    `${config.baseUrl}/orders/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.data;
};
