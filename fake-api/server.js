// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas de autenticação
app.use("/auth", authRoutes);

// Rota padrão
app.get("/", (req, res) => {
  res.send("API Fake rodando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
