const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// RSVP endpoint
app.post('/rsvp', (req, res) => {
  const { name, attend, plusone, partnerName, wish } = req.body;

  console.log('New RSVP received:', { name, attend, plusone, partnerName, wish });

  // TODO: persist the RSVP (database, Google Sheets, Telegram bot, etc.)

  res.json({ ok: true });
});

// Serve the frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
