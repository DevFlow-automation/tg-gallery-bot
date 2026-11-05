import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
    ctx.reply("Привет! Бот успешно запущен на Vercel 🚀");
});

// Временный помощник, чтобы узнать ID темы
bot.on("message", (ctx) => {
    // Если сообщение написано в теме, бот пришлет её ID
    if (ctx.message.message_thread_id) {
        ctx.reply(`ID этой темы: ${ctx.message.message_thread_id}`);
    }
});

export default webhookCallback(bot, 'http');
