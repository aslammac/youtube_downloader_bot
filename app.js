const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const errorModule = require("./lib/middlewares/error");
const { bot, secretPath } = require("./lib/routes/bot");

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    "Method-:method URL-:url Status-:status Len-:res[content-length] - res_time-:response-time ms"
  )
);
app.use(errorModule.errorModule);
bot.launch();
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
