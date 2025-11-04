import express from "express";
const router = express.Router();

// Usuário fake
const user = {
  username: "pedro.pohlmann",
  password: "senha123",
  email: "pedro.pohlmann@example.com"
};

// POST /auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Usuário e senha obrigatórios" });

  if (username === user.username && password === user.password)
    return res.status(200).json({
      token: "fake-jwt-token-123456",
      user: { username, email: user.email }
    });

  return res.status(401).json({ message: "Credenciais inválidas" });
});

// POST /auth/forgot-password
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "E-mail obrigatório" });

  if (email === user.email)
    return res.status(200).json({
      message: "E-mail de recuperação enviado (fake)"
    });

  return res.status(400).json({ message: "E-mail não encontrado" });
});

// POST /auth/reset-password
router.post("/reset-password", (req, res) => {
  const { token, password, passwordConfirmation } = req.body;

  if (!token || !password || !passwordConfirmation)
    return res.status(400).json({ message: "Campos obrigatórios" });

  if (token !== "fake-jwt-token-123456")
    return res.status(400).json({ message: "Token inválido ou expirado" });

  if (password !== passwordConfirmation)
    return res.status(400).json({ message: "Senhas não conferem" });

  return res.status(200).json({ message: "Senha redefinida com sucesso" });
});

export default router;
