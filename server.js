// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

function authenticate(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.json({ success: false, message: 'Unauthorized' });
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    req.session.user = { id: user.id, username: user.username };
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (users.some((u) => u.username === username)) {
    res.json({ success: false, message: 'Username already exists' });
  } else {
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    req.session.user = { id: newUser.id, username: newUser.username };
    res.json({ success: true });
  }
});

app.get('/logout', authenticate, (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/user', authenticate, (req, res) => {
  res.json({ user: req.session.user });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

