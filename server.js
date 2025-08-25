import express from 'express';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRouter);

// Middleware para tratar erros (último middleware)
app.use((err, req, res, next) => {
  console.error(err.stack); // Mostra o erro completo no terminal
  res.status(500).json({ message: 'Erro interno no servidor' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
