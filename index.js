import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
    ctx.reply("Привет! Бот-модератор работает 🚀");
});

bot.on("message", async (ctx) => {
    const GALLERY_THREAD_ID = 18;

    // Проверяем, что сообщение написано именно в теме "Галерея"
    if (ctx.message.message_thread_id === GALLERY_THREAD_ID) {
        
        // Проверяем наличие медиаконтента
        const hasMedia = ctx.message.photo || 
                         ctx.message.video || 
                         ctx.message.document || 
                         ctx.message.animation || 
                         ctx.message.video_note;

        if (!hasMedia) {
            try {
                // Удаляем текстовое сообщение
                await ctx.deleteMessage();
                
                // Отправляем предупреждение
                const warning = await ctx.reply("⚠️ В этой теме разрешены только картинки и видео с подписями. Текст удален.", {
                    message_thread_id: GALLERY_THREAD_ID
                });
                
                // Удаляем сообщение бота через 5 секунд (5000 миллисекунд)
                setTimeout(() => {
                    ctx.api.deleteMessage(ctx.chat.id, warning.message_id).catch(() => {});
                }, 5000);
            } catch (error) {
                console.error("Ошибка удаления:", error);
            }
        }
    }
});

export default webhookCallback(bot, 'http');
