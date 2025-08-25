import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Memória para armazenar usuários (só para exemplo)
const users = [];

// Rota registro
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Verifica se usuário já existe
  const userExist = users.find((u) => u.username === username);
  if (userExist) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Salva o usuário
  users.push({ username, password: hashedPassword });

  res.json({ message: "Usuário registrado com sucesso" });
});

// Rota login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Busca usuário
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  // Verifica senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  // Gera token JWT
  const token = jwt.sign({ username }, "secreta123", { expiresIn: "1h" });

  res.json({ token });
});

//Rota protegida
router.get("/profile", authMiddleware, (req, res) => {
    res.json({message: `Bem vindo ${req.user.username}`})
  });

export default router;
