export default class ModalPayload {
	name: string;
	context: string;
	img: string;
	alt: string;
	input: string[];
	hours: number;

	type = "modal";
	submit: { type: "plain_text"; text: string; emoji: true };
	close = { type: "plain_text", text: "Cancel", emoji: true };
	title = { type: "plain_text", text: "Wrangler Shop: Purchase", emoji: true };

	get blocks() {
		const blocks = [
			{
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": this.name,
					"emoji": true
				},
				"level": 1
			}, {
				"type": "context",
				"elements": [
					{
						"type": "plain_text",
						"text": this.context,
						"emoji": true
					}
				]
			}, {
				"type": "image",
				"image_url": this.img,
				"alt_text": this.alt
			}
		];

		if (this.input.length > 0) {
			blocks.push({
				"type": "input",
				"element": {
					"type": "static_select",
					"placeholder": {
						"type": "plain_text",
						"text": "select an option:",
						"emoji": true
					},
					"options": this.input.map((opt, i) => ({
						"text": {
							"type": "plain_text",
							"text": opt,
							"emoji": true
						},
						"value": `value-${i}`
					})),
					"action_id": "static_select-action"
				},
				"label": { "type": "plain_text", "text": "Label", "emoji": true },
				"optional": false
			});
		}

		return blocks;
	}

	constructor(g) {
		this.name = g[0];
		this.context = g[1];
		this.img = g[2];
		this.alt = g[3];
		this.input = g[4];
		this.hours = g[5];
		this.submit = { type: "plain_text", text: `${g[5]} hour${g[5] === 1 ? "" : "s"}`, emoji: true };
	}

	toJSON() {
		return {
			type: this.type,
			submit: this.submit,
			close: this.close,
			title: this.title,
			blocks: this.blocks,
		};
	}
}

// payload json
// {
// 	"type": "modal",
// 	"submit": {
// 		"type": "plain_text",
// 		"text": this.hours,
// 		"emoji": true
// 	},
// 	"close": {
// 		"type": "plain_text",
// 		"text": "Cancel",
// 		"emoji": true
// 	},
// 	"title": {
// 		"type": "plain_text",
// 		"text": "Wrangler Shop: Purchase",
// 		"emoji": true
// 	},
// 	"blocks": [
// 		{
// 			"type": "header",
// 			"text": {
// 				"type": "plain_text",
// 				"text": this.name,
// 				"emoji": true
// 			},
// 			"level": 1
// 		},
// 		{
// 			"type": "context",
// 			"elements": [
// 				{
// 					"type": "plain_text",
// 					"text": this.context,
// 					"emoji": true
// 				}
// 			]
// 		},
// 		{
// 			"type": "image",
// 			"title": {
// 				"type": "plain_text",
// 				"text": "I love tacos",
// 				"emoji": true
// 			},
// 			"image_url": this.img,
// 			"alt_text": this.alt
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 				"type": "static_select",
// 				"placeholder": {
// 					"type": "plain_text",
// 					"text": "Select an item",
// 					"emoji": true
// 				},
// 				"options": [
// 					{
// 						"text": {
// 							"type": "plain_text",
// 							"text": "*plain_text option 0*",
// 							"emoji": true
// 						},
// 						"value": "value-0"
// 					},
// 					{
// 						"text": {
// 							"type": "plain_text",
// 							"text": "*plain_text option 1*",
// 							"emoji": true
// 						},
// 						"value": "value-1"
// 					},
// 					{
// 						"text": {
// 							"type": "plain_text",
// 							"text": "*plain_text option 2*",
// 							"emoji": true
// 						},
// 						"value": "value-2"
// 					}
// 				],
// 				"action_id": "static_select-action"
// 			},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Label",
// 				"emoji": true
// 			},
// 			"optional": false
// 		}
// 	]
// }
