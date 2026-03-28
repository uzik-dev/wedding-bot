const express = require('express');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const BOT_TOKEN = 8546920124:AAGamyVGi91xZ3Y6fZqJp0RRCXEU8apGP3s;
const CHAT_ID   = 5857451420;

const responses = [];

async function sendToTelegram(text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' })
  });
}

app.post('/rsvp', async (req, res) => {
  const { name, attend, plusone, partnerName, wish } = req.body;
  responses.push({ name, attend, plusone, partnerName, wish, date: new Date() });

  const attendLabel = { yes: '✅ Придёт', maybe: '🤔 Не уверен', no: '❌ Не придёт' };
  const plusLabel = plusone === 'partner'
    ? `со второй половинкой (${partnerName || '?'})`
    : 'один(а)';

  const lines = [
    `📩 *Новый ответ от гостя*`,
    `👤 ${name}`,
    attendLabel[attend] || attend,
    attend !== 'no' && plusone ? `👫 Придёт ${plusLabel}` : null,
    wish ? `💬 "${wish}"` : null,
  ].filter(Boolean).join('\n');

  await sendToTelegram(lines);
  res.json({ ok: true });
});

app.get('/report', async (req, res) => {
  await sendReport();
  res.json({ ok: true });
});

async function sendReport() {
  const yes   = responses.filter(r => r.attend === 'yes').length;
  const maybe = responses.filter(r => r.attend === 'maybe').length;
  const no    = responses.filter(r => r.attend === 'no').length;
  const withPartner = responses.filter(r => r.plusone === 'partner').length;

  await sendToTelegram([
    `📊 *Отчёт по гостям*`,
    `Всего ответов: ${responses.length}`,
    `✅ Придут: ${yes}`,
    `🤔 Не уверены: ${maybe}`,
    `❌ Не придут: ${no}`,
    `👫 Со второй половинкой: ${withPartner}`,
    `👥 Ожидается гостей: ~${yes + withPartner}`,
  ].join('\n'));
}

// Еженедельный отчёт
setInterval(sendReport, 7 * 24 * 60 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
