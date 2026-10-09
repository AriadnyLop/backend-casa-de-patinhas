const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados em memória do servidor
let users = [
  { name: 'Administrador', user: 'admin', pass: 'Beom.2608' },
  { name: 'Ariany Lopes', user: 'arianylopes', pass: 'Ariany1907' }
];

app.get('/', (req, res) => {
  res.send('API Casa de Patinhas a funcionar!');
});

// Login
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

// Listar Usuários
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ name: u.name, user: u.user })));
});

// Cadastrar Novo Usuário
app.post('/api/users', (req, res) => {
  const { name, user, pass } = req.body;

  if (users.some(u => u.user === user)) {
    return res.status(400).json({ success: false, message: 'Usuário já existe' });
  }

  users.push({ name, user, pass });
  res.json({ success: true, message: 'Usuário cadastrado com sucesso' });
});

// Excluir Usuário
app.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;
  users = users.filter(u => u.user !== username);
  res.json({ success: true });
});

// Alterar Senha
app.post('/api/change-password', (req, res) => {
  const { user, newPass } = req.body;
  const userObj = users.find(u => u.user === user);

  if (!userObj) {
    return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
  }

  userObj.pass = newPass;
  res.json({ success: true, message: 'Senha alterada com sucesso' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
