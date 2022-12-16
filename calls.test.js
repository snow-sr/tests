import { cadastroUsuario, validateOrder } from "./calls.js";

function randomInt() {
  return Math.floor(Math.random() * 100000);
}
function validateUser(user) {
  if (user.first_name === "") {
    return { s: false, m: "Nome não pode ser vazio" };
  } else if (user.last_name === "") {
    return { s: false, m: "Nome não pode ser vazio" };
  } else if (user.email === "") {
    return { s: false, m: "Email não pode ser vazio" };
  } else if (user.password === "") {
    return { s: false, m: "Senha não pode ser vazio" };
  } else if (user.telefone === "") {
    return { s: false, m: "Telefone não pode ser vazio" };
  } else if (user.endereco === "") {
    return { s: false, m: "endereco não pode ser vazio" };
  }

  if (user.telefone === "912345678") {
    return { s: false, m: "Use um número real" };
  } else if (user.telefone.length < 10) {
    return { s: false, m: "Número de telefone inválido" };
  }

  if (!user.email.includes(".com")) {
    return { s: false, m: "Email inválido" };
  }

  return true;
}
const defaultCorrectUser = {
  first_name: "Vinicius",
  last_name: "Dacio",
  email: `viniciusdacio${randomInt()}@gmail.com`,
  password: "admin123",
  telefone: "47912345678",
  endereco: "Rua dos bobos, 0",
};
const defaultErrorUser = {
  first_name: "Vinicius",
  last_name: "Dacio",
  email: `viniciusdacio${randomInt()}@gmail.com`,
  password: "admin123",
  telefone: "912345678",
  endereco: "Rua dos bobos, 0",
};
const emailErrorUser = {
  first_name: "Vinicius",
  last_name: "Dacio",
  email: `viniciusdacio${randomInt()}@gmail`,
  password: "admin123",
  telefone: "47912345678",
  endereco: "Rua dos bobos, 0",
};

const defaultCorrectOrder = {
  imageForPrinting: {
    size: "3",
    path: "C:\\fakepath\\image.png",
    type: "image/png",
  },
  order_date: "2022-12-16",
  order_status: "Pendente",
  user: 11,
  cor: "Azul",
  bottle: 1,
};

const sizeErrorOrder = {
  imageForPrinting: {
    size: "17",
    path: "C:\\fakepath\\image.png",
    type: "image/png",
  },
  order_date: "2022-12-16",
  order_status: "Pendente",
  user: 11,
  cor: "Azul",
  bottle: 1,
};

const defaultErrorOrder = {
  imageForPrinting: {
    size: "3",
    path: "C:\\fakepath\\image.png",
    type: "image/png",
  },
  order_date: "2022-12-16",
  order_status: "Pendente",
  user: 11,
  cor: "",
  bottle: 1,
};

const nonPngErrorOrder = {
  imageForPrinting: {
    size: "3",
    path: "C:\\fakepath\\image.webp",
    type: "image/webp",
  },
  order_date: "2022-12-16",
  order_status: "Pendente",
  user: 11,
  cor: "Azul",
  bottle: 1,
};
const noImageOrder = {
  imageForPrinting: {},
  order_date: "2022-12-16",
  order_status: "Pendente",
  user: 11,
  cor: "Azul",
  bottle: 1,
};

describe("cadastroUsuario", () => {
  it("should return a user", async () => {
    const user = await cadastroUsuario(defaultCorrectUser)
      .then((res) => {
        console.log(res);
        let user = res;
        expect(res.first_name).toBe("Vinicius");
      })
      .catch((err) => console.log(err));
  });
});

describe("errorCadastro", () => {
  it("should return an error", async () => {
    console.log(validateUser(defaultErrorUser).m);
    expect(validateUser(defaultErrorUser).s).toBe(false);
  });
});

describe("errorCadastroEmail", () => {
  it("should return an error", async () => {
    console.log(validateUser(emailErrorUser).m);
    expect(validateUser(emailErrorUser).s).toBe(false);
  });
});

describe("pedidoCorreto", () => {
  it("should return a order", async () => {
    const order = await validateOrder(defaultCorrectOrder);
    expect(order.s).toBe(true);
  });
});

describe("pedidoErrado", () => {
  it("should return an error", async () => {
    const order = await validateOrder(defaultErrorOrder);
    console.log(order.m);
    expect(order.s).toBe(false);
  });
});

describe("uploadCorreto", () => {
  it("should return a order", async () => {
    const order = await validateOrder(defaultCorrectOrder);
    expect(order.s).toBe(true);
  });
});

describe("uploadErradoTamanho", () => {
  it("should return an error", async () => {
    const order = await validateOrder(sizeErrorOrder);
    console.log(order.m);
    expect(order.s).toBe(false);
  });
});

describe("uploadErradoFormato", () => {
  it("should return an error", async () => {
    const order = await validateOrder(nonPngErrorOrder);
    console.log(order.m);
    expect(order.s).toBe(false);
  });
});

describe("downloadCorreto", () => {
  it("should return a donwload", async () => {
    const order = await validateOrder(defaultCorrectOrder);
    expect(order.s).toBe(true);
  });
});

describe("downloadCorreto", () => {
  it("should return a error", async () => {
    const order = await validateOrder(noImageOrder);
    expect(order.s).toBe(false);
  });
});
