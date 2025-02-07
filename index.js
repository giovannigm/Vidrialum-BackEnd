const express = require("express");
const path = require("path");
const cors = require("cors"); // Importar cors
const bodyParser = require("body-parser"); // Importar body-parser
const app = express();
const config = require("./config/config"); // Importar configuraciones

const port = config.port; // Usar el puerto desde la configuración
const place = config.place; // Usar el ruta desde el .env

app.use(cors({ origin: place })); // solo deja que la ruta esa acceda a la API.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio 'public' "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta de email
const emailRoutes = require("./routes/emailRoutes");
app.use("/email", emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
