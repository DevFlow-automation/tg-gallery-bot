import { Bot, webhookCallback } from 'grammy';

// Получаем токен из скрытых переменных окружения
const bot = new Bot(process.env.BOT_TOKEN);

// Простая команда для проверки
bot.command("start", (ctx) => {
    ctx.reply("Привет! Бот успешно запущен на Vercel 🚀");
});

// Экспортируем функцию для Vercel
export default (req, res) => webhookCallback(bot, 'express')(req, res);
