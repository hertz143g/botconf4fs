const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(token, { polling: false });

// Обработчик /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Открыть магазин:", {
    reply_markup: {
      keyboard: [[{
        text: "Открыть магазин",
        web_app: { url: webAppUrl }
      }]],
      resize_keyboard: true
    }
  });
});

// Вебхук endpoint
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Просто для проверки
app.get('/', (req, res) => {
  res.send('Bot is alive 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
