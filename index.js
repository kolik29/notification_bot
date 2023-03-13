const express = require('express'); // для обработки url
const telegramBot = require('node-telegram-bot-api'); // апи для работы с телегой
const bodyParser = require('body-parser'); // парсит тело ответа

const app = express();
app.use(bodyParser.json());

const token = '6231043770:AAEqdLDUfoCVcdrR644yx63qcXV5BbgaJ_U';
const bot = new telegramBot(token, { polling: true });

let chat_ids = []; // список id подключенных чатов

app.post('/send_user_data', (req, res) => { // Хук срабатывает по запросу на http://example.ru/send_user_data
    console.log(req.body); // выводить в консоль тело запроса

    chat_ids.forEach(id => { 
        // и каждому подключенному юзеру отправляет сообщение
        bot.sendMessage(id, ` 
Новый юзер
Имя: ${req.body.name}
Почта: ${req.body.email}
        `);
    })
})

bot.onText(/\/start/, (msg) => { // при первом выполнении команды /start
    bot.sendMessage(msg.chat.id, 'Успешный успех'); // подверждение, что этот скрипт работает

    chat_ids.push(msg.chat.id); // добавляет id чата в массив
})

app.listen(3001, () => {
    console.log(`Server running at http://185.178.45.117:3001/`);
})