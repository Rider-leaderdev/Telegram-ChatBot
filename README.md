# Telegram ChatGPT Bot

## What is the project about

It's a simple Telegram bot that utilizes OpenAI's ChatGPT API to generate human-like responses to user messages. The bot can be used in both private chats and group chats, responding only when mentioned in a group chat. (In order to activate bot in a group chat, you need to make bot an admin of a group)

## Requirements

To run this project, you need:

1. Node.js (version 14 or higher) installed on your machine.
2. A Telegram bot token, which can be obtained by creating a new bot using the [BotFather](https://core.telegram.org/bots#botfather) on Telegram.
3. An OpenAI API key, which can be obtained by signing up for an API key on the [OpenAI website](https://beta.openai.com/signup/).

## Global installations

Before running the project, you need to install the following packages globally:

1. TypeScript: `npm install -g typescript`
2. ts-node: `npm install -g ts-node`

These packages are required for compiling and running TypeScript code.

## How to run the project

1. Clone the repository or copy the provided code into a new directory.

2. Create a `.env` file in the project directory and add the following variables:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
```


Replace `your_telegram_bot_token` and `your_openai_api_key` with your actual Telegram bot token and OpenAI API key, respectively.

3. Install the required dependencies by running:

```
npm install
```

4. Run the bot using the following command:

```bash
npm run start:dev

# or for production

npm start
```


The bot should now be running, and you should see the message "Telegram bot is running..." in your console.

You can now interact with the bot by sending it a message on Telegram. If the bot is added to a group chat, it will respond when mentioned.
