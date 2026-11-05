import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

// Вспомогательная функция для умной паузы
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

bot.command("start", (ctx) => {
    ctx.reply("Привет! Бот-модератор работает 🚀");
});

bot.on("message", async (ctx) => {
    const GALLERY_THREAD_ID = 18;

    if (ctx.message.message_thread_id === GALLERY_THREAD_ID) {
        
        const hasMedia = ctx.message.photo || 
                         ctx.message.video || 
                         ctx.message.document || 
                         ctx.message.animation || 
                         ctx.message.video_note;

        if (!hasMedia) {
            try {
                await ctx.deleteMessage();
                
                const warning = await ctx.reply("⚠️ В этой теме разрешены только картинки и видео с подписями. Текст удален.", {
                    message_thread_id: GALLERY_THREAD_ID
                });
                
                // Искусственно удерживаем функцию в рабочем состоянии 5 секунд
                await sleep(5000);
                
                // Теперь удаляем сообщение бота
                await ctx.api.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {});
            } catch (error) {
                console.error("Ошибка удаления:", error);
            }
        }
    }
});

export default webhookCallback(bot, 'http');
