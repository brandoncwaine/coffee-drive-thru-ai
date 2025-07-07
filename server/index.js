import * as PlayHT from 'playht';
import express from 'express';
import cors from 'cors';

import { GoogleGenerativeAI } from '@google/generative-ai';

import drinks from './data/drinks.json' with { type: 'json' };
import extras from './data/extras.json' with { type: 'json' };

const app = express();

// Initialize PlayHT SDK
try {
	PlayHT.init({
		apiKey: '44011e997e954ac6aed4b1af481455dd',
		userId: 'QIfcnABQ2BS4x231yvp0LbF9DnR2',
	});
} catch (error) {
	console.log('Failed to initialise PlayHT SDK', error.message);
}

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyBvQM3BC5_eeCfDfSJalE83Ji6INyiKxi0');

const JSON_SCHEMA = `
    {
        "order_item": [
            "name": { "type": "string" },
            "price": { "type": "number" },
            "extras": [
                "name": { "type": "string" },
                "cost": { "type": "number" }
            ]
        ],
		"order_complete": { "type": "boolean" },
		"current_order": { "type": "array" },
        "response": { type: "string" },
    }
`;
const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
	generationConfig: { responseMimeType: 'application/json' },
	systemInstruction: `You are a coffee shop assistant. You will help the user order coffee. You will ask for the user's type of coffee they want. You will repeat back each item the user orders. Once you take an order item, you will ask if the user would like anything else. If the user wants any extras, you will ask what they want. You will then give the user the total cost of the order. Once they have confirmed the order is complete, by responding with "No" or "No that is everything" or "That's everything", thank them for their order and ask them to drive around to the payment window.  If tthe user says they are done ordering, you will say "Thank you for your order. Please drive around to the payment window." Do not send any order items back to the user if they are done with their order. Your response must follow this JSON schema, ${JSON_SCHEMA}. You will only accept the following order items: ${drinks
		.map((item) => item.name)
		.join(', ')}. You will only accept the following extras: ${extras
		.map((item) => item.name)
		.join(
			', '
		)}. If the order item is not in the list, you will say "Sorry, I don't have that item. Can you try again?"`,
});

app.use(cors());

app.get('/', (req, res) => {
	res.send('Server is up and running');
});

app.get('/talk', async (req, res) => {
	const prompt = req.query.prompt || '';
	const currentItems = req.query.currentOrder || [];

	const contextualPrompt =
		'The users current order is: ' +
		currentItems.map((item) => item.name).join(', ') +
		'. The user wants to order: ' +
		prompt +
		'. Add any new orders to the existing order. ';

	await model
		.generateContent(contextualPrompt)
		.then((response) => {
			res.send(response.response.candidates[0].content.parts[0].text);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Endpoint to convert ChatGPT prompt response into audio stream
app.get('/say', async (req, res) => {
	try {
		const { prompt } = req.query;

		if (!prompt || typeof prompt !== 'string') {
			res.status(400).send('LLM prompt not provided in the request');
			return;
		}

		res.setHeader('Content-Type', 'audio/mpeg');

		const stream = await PlayHT.stream(prompt, {
			voiceId:
				's3://voice-cloning-zero-shot/aa753d26-bc20-479f-95af-5c3c1c970d93/original/manifest.json', //s3://mockingbird-prod/arthur_vo_training_9281c8fd-c7f0-4445-a148-466292d3d329/voices/speaker/manifest.json
		});

		// Pipe response audio stream to browser
		stream.pipe(res);
	} catch (error) {
		console.error('Error!!:', error);
		res.status(500).send('Internal Server Error');
	}
});

app.listen(8080, () => {
	console.log('server listening on port 8080');
});
