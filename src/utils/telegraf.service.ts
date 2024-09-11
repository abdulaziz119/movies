import { Telegraf, Markup } from "telegraf";

class BotService {
    private bot: Telegraf;

    constructor(token: string) {
        this.bot = new Telegraf(token);
        this.initializeCommands();
    }

    private initializeCommands() {
        this.bot.start((ctx) => {
            ctx.reply(
                '👋 Assalomu alaykum!  ' +ctx.from.first_name+'\n\n'+
                ' 🎬Sizni eng so‘nggi va eng sara filmlar dunyosiga taklif qilamiz! 🍿\n'+
                'Bizning platformada har xil janrdagi filmlarni bepul tomosha qiling va zavqlaning! 🎥\n'+
                'Doimiy yangiliklardan xabardor bo‘lish uchun kanalimizga obuna bo‘ling: @ajal_uyi_daxshatli_uy\n'+
                'Yangi chiqadigan filmlar va eksklyuziv premyeralarni birinchi bo‘lib ko‘ring! 🔥'
            );
        });
    }

    public launch() {
        this.bot.launch();

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }
}
const botService = new BotService(process.env.TELEGRAM_BOT_TOKEN as string);

botService.launch();
