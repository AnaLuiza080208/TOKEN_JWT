import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

// Rotas de autenticação
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("API rodando! Use /auth/register ou /auth/login");
});


// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
