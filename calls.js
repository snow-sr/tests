import axios from "axios";
const baseUrl = "https://back-endgarrafinhas-production.up.railway.app";

export const cadastroUsuario = async (user) => {
  const response = await axios.post(`${baseUrl}/users/`, user);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(`${baseUrl}/orders/`, order);
  return response.data;
};

export const validateOrder = (order) => {
  let status = true;
  let message = "";
  if (order.imageForPrinting === "" || order.imageForPrinting === undefined) {
    status = false;
    message = "Imagem não pode ser vazia";
  }

  if (
    order.imageForPrinting.type !== "image/png" ||
    order.imageForPrinting.type == undefined
  ) {
    status = false;
    message = "Imagem precisa ser png ou jpg";
  }

  if (order.order_date === "") {
    status = false;
    message = "Data não pode ser vazia";
  }
  if (order.order_status === "") {
    status = false;
    message = "Status não pode ser vazio";
  }
  if (order.user === "") {
    status = false;
    message = "Usuário não pode ser vazio";
  }
  if (order.bottle === "") {
    status = false;
    message = "Garrafa não pode ser vazia";
  }
  if (
    order.cor === "" ||
    order.cor === "Selecione a cor" ||
    order.cor === undefined
  ) {
    status = false;
    message = "Cor não pode ser vazia";
  }

  if (order.imageForPrinting.size > 15) {
    status = false;
    message = "Imagem não pode exceder 15mb";
  }
  return { s: status, m: message };
};
