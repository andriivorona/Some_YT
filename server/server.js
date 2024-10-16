// server/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000 || 3001;
const users = [
  { username: 'andrii.y.vorona@gmail.com', password: '123456' }
]; // Масив для зберігання користувачів

app.use(bodyParser.json());

// Секретний ключ для JWT
const JWT_SECRET = 'your-secret-key';

// Маршрут для реєстрації
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Перевірка наявності користувача
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Хешування паролю перед збереженням
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// Додайте цей обробник для кореневого маршруту
app.get('/', (req, res) => {
  res.send('Welcome to the authentication server');
});

// Маршрут для логіна
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user =>  user.username === username && user.password === password);
  console.log('user', user)
  if (user) {
    // Аутентифікація пройшла успішно
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Невірні дані
    res.status(400).json({ message: 'Invalid credentials' });
  }

  // Перевірка паролю
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Генерація JWT токена
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Захищений маршрут
app.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    res.json({ message: 'This is a protected route', user: decoded });
  });
});

// Запуск серверу
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//cors
const cors = require('cors');
app.use(cors());
