const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const secretPath = `/telegraf/${bot.secretPathComponent()}`;
const ytdl = require("ytdl-core");
const fs = require("fs");

//bot middleware
bot.start((ctx) => ctx.reply(`Welcome to the mac BOT!\n /help`));

bot.help((ctx) =>
  ctx.reply(`
/start - start bot
/help - show help`)
);
bot.on("message", async (ctx) => {
  //   ytdl.getInfo(ctx.message.text, (err, info) => {
  //     console.log(info);
  //   });
  console.log(ctx.message.text);
  if (fs.existsSync(`${__dirname}/files/${ctx.from.id}.mp4`)) {
    fs.unlink(`${__dirname}/files/${ctx.from.id}.mp4`, (err) => {
      if (err) console.log(err);
      console.log(`${__dirname}/files/${ctx.from.id}.mp4 was deleted`);
    });
  }
  let video = ytdl(ctx.message.text, {
    quality: "highest",
  }).pipe(fs.createWriteStream(`./files/${ctx.from.id}.mp4`));
  video.on("close", () => {
    console.log("video downloaded");
    ctx.telegram.sendChatAction(ctx.chat.id, "upload_video");
    ctx.telegram.sendVideo(ctx.chat.id, {
      source: `./files/${ctx.from.id}.mp4`,
    });
  });
});

module.exports = { bot, secretPath };
