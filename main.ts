import dotenv from "dotenv";
import axios from "axios";
import TelegramBot, { MessageEntity } from "node-telegram-bot-api";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!TELEGRAM_BOT_TOKEN || !OPENAI_API_KEY) {
  console.error(
    "Please set TELEGRAM_BOT_TOKEN and OPENAI_API_KEY in the .env file"
  );
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

/**
 * Check if the bot is mentioned in the message
 */
function isBotMentioned(
  entities: MessageEntity[] | undefined,
  text: string,
  botUsername: string
): boolean {
  if (!entities) return false;

  return entities.some(
    (entity) =>
      entity.type === "mention" &&
      text.substr(entity.offset, entity.length) === `@${botUsername}`
  );
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text || ""; // Ensure text is always a string
  if(userMessage === "/start") {
    const msg = ''
    await bot.sendMessage(chatId, `🏀⚽️🏈 Welcome to BetGenie 🎾⚾️🏒

Hey there, sports fan! 🚀 You're in the right place for cutting-edge analysis, data-driven predictions, and expert insights across all your favorite sports. 🏆

💡 Here's what you can do:

- Get pre-game and live-game analysis
- Explore detailed player and team stats
- Receive predictions powered by advanced algorithms
- Stay updated with breaking news in the sports world

Ready to take the betting game to the next level? We’ve got you covered…

💬 To start, simply ask me a question! (example: What is your prediction of the next Real Madrid game?)`);
    return;
  }
  const botInfo = await bot.getMe();
  const botUsername = botInfo.username || "";

  console.log("Received message:", msg);

  // Check if the bot is mentioned or if it's a private chat
  if (
    isBotMentioned(msg.entities, userMessage, botUsername) ||
    msg.chat.type === "private"
  ) {
    // Remove the bot's mention from the user message
    const sanitizedMessage = userMessage.replace(`@${botUsername}`, "").trim();

    try {
      // Make a request to OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Use "gpt-4" if you want GPT-4
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: sanitizedMessage },
          ],
          max_tokens: 150,
          temperature: 0.8,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const aiReply = response.data.choices[0].message.content.trim();
      console.log("AI Reply:", aiReply);

      // Send the AI's reply to the user
      await bot.sendMessage(chatId, aiReply);
    } catch (error: any) {
      console.error("Error while processing user message:", error.response?.data || error.message);
      await bot.sendMessage(
        chatId,
        "Sorry, I couldn't process your message. Please try again later."
      );
    }
  }
});

console.log("Telegram bot is running...");
