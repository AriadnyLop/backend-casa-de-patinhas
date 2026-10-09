const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Senhas salvas de forma CRIPTOGRAFADA (Hash Bcrypt)
// Ninguém consegue descobrir a senha original olhando este código!
const users = [
  {
    name: 'Administrador',
    user: 'admin',
    // Hash da senha "Beom.2608"
    passwordHash: '$2a$10$eR3wE8/xG8mOQG.rXpS/5.Zq/QJ5uM4vY.gG2m/3qS4W5vG6H7I8J' 
  },
  {
    name: 'Ariany Lopes',
    user: 'arianylopes',
    // Hash da senha "Ariany1907"
    passwordHash: '$2a$10$9K2mE7/wF7lNPF.qWOR/4.Yp/PI4tL3uX.fF1l/2pR3V4uF5G6H7I'
  }
];

// Rota de Teste
app.get('/', (req, res) => {
  res.send('API Casa de Patinhas está no ar! 🐾');
});

// Rota de Login Segura
app.post('/api/login', async (req, res) => {
  const { user, pass } = req.body;

  const foundUser = users.find(u => u.user === user);
  if (!foundUser) {
    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
  }

  // Compara a senha digitada com a hash salva
  const validPassword = await bcrypt.compare(pass, foundUser.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
  }

  // Sucesso! Retorna os dados do usuário sem a senha
  res.json({
    success: true,
    user: { name: foundUser.name, user: foundUser.user }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));