const http = require("http");
require("dotenv").config();

const { PORT } = require("./app.config");

const expressApp = require("./app");

const server = http.createServer(expressApp);

server.on("error", (err) => console.log(`Error while creating server: ${err}`));
server.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
