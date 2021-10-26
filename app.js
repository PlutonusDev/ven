const config = require("./config");

const axios = require("axios");
const discord = require("discord.js");
const client = new discord.Client({
	intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
});

client.on("messageCreate", async (msg) => {
	if(msg.author.bot || !msg.content || msg.webhookId) return;

	(() => {
		const hook = config.hubServer.channels[msg.channel.id];
		if(hook) {
			console.log(`\tHUB: "${msg.member.displayName}" sent: "${msg.content}"`);
			return sendWebhook(hook.toLowerCase() === "base" ? config.hubServer.baseWebhookUrl : hook, msg);
		}
	})();

	(() => {
		const hook = config.supportServer.channels[msg.channel.id];
		if(hook) {
			console.log(`\tSUPPORT: "${msg.member.displayName}" sent: "${msg.content}"`);
			return sendWebhook(hook.toLowerCase() === "base" ? config.supportServer.baseWebhookUrl: hook, msg);
		}
	})();
});

function sendWebhook(url, msg) {
	axios({
		method: "POST",
		url: url,
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			username: msg.member.displayName,
			avatar_url: msg.author.avatarURL({size:128}),
			content: msg.content
		}
	}).catch(e => {
		msg.reply(`Something went wrong sending the webhook to the other server. Check the webhook or if the server was deleted :flushed:\n\nError: ${e.message}`);
	});
}

client.login(config.bot.token);
