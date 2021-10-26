// Rename this file to config.js

module.exports = {
	bot: {
		token: ""
	},

	supportServer: {
		// Default webhook for hub server
		baseWebhookUrl: "",

		/*
			channelId: webhookUrl	-> send messages from channelId to a specific webhook
			channelId: "base"	-> send messages from channelId to baseWebhookUrl
		*/
		channels: {
			"id": "base",
			"id": "base"
		}
	},

	hubServer: {
		// Default webhook for support server
		baseWebhookUrl: "",

		/*
			channelId: webhookUrl	-> send messages from channelId to a specific webhook
			channelId: "base"	-> send messages from channelId to baseWebhookUrl
		*/
		channels: {
			"id": "base",
			"id": "base"
		}
	}
}
