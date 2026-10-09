const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Usuários e Senhas definidos com segurança no Back-end
const users = [
  {
    name: 'Administrador',
    user: 'admin',
    pass: 'Beom.2608'
  },
  {
    name: 'Ariany Lopes',
    user: 'arianylopes',
    pass: 'Ariany1907'
  }
];

app.get('/', (req, res) => {
  res.send('API Casa de Patinhas funcionando!');
});

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;

  const foundUser = users.find(u => u.user === user && u.pass === pass);

  if (!foundUser) {
    return res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
  }

  res.json({
    success: true,
    user: { name: foundUser.name, user: foundUser.user }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
