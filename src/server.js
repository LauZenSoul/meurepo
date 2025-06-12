// /home/ubuntu/projeto_instituto_rural_digital/itdra-backend/src/server.js

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ITDRA a correr na porta ${PORT}`);
});

