import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
    ctx.reply("Привет! Бот успешно запущен на Vercel 🚀");
});

// Используем чистый http-адаптер для Vercel
export default webhookCallback(bot, 'http');
