const express = require('express'); // для обработки url
const telegramBot = require('node-telegram-bot-api'); // апи для работы с телегой
const bodyParser = require('body-parser'); // парсит тело ответа

const app = express();
app.use(bodyParser.json());

const token = '6231043770:AAEqdLDUfoCVcdrR644yx63qcXV5BbgaJ_U';
const bot = new telegramBot(token, { polling: true });

let chat_ids = [];

app.post('/send_user_data', (req, res) => {
    console.log(req.body);

    chat_ids.forEach(id => {
        bot.sendMessage(id, `
Новый юзер
Имя: ${req.body.name}
Почта: ${req.body.email}
        `);
    })
})

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Успешный успех');

    chat_ids.push(msg.chat.id);
})

app.listen(3001, () => {
    console.log(`Server running at http://185.178.45.117:3001/`)
})