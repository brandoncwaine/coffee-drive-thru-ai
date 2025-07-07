import axios from 'axios';
import { FaMicrophone, FaMicrophoneSlash, FaSpinner } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import OrderItem from './components/OrderItem';

import { OrderItemProps } from './types/OrderItem';
import BotEyes from './components/BotEyes';

function View() {
	const [idle, setIdle] = useState(false);
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);
	const [userRequest, setUserRequest] = useState('');
	const [isRecordingVoice, setIsRecordingVoice] = useState(false);

	const [orderComplete, setOrderComplete] = useState(false);

	const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);

	const recognition = new (window.SpeechRecognition ||
		window.webkitSpeechRecognition)();
	recognition.lang = 'en-US';
	recognition.continuous = true;

	const getBotResponse = async (userTranscript: string) => {
		setLoading(true);
		console.log('Getting bot response');
		await axios
			.get('http://localhost:8080/talk', {
				params: { prompt: userTranscript, currentOrder: orderItems },
			})
			.then((data: any) => {
				if (data.data.order_item.length > 0) {
					setOrderItems(data.data.current_order);
				}
				setResponse(data.data.response);
				console.log(data.data);
				if (data.data.order_complete) {
					setOrderComplete(true);
				}
			})
			.catch((err) => {
				console.log(err);
				setResponse(
					"Sorry, I couldn't get a response from my server. We'll be with you shortly."
				);
			});
		setLoading(false);
	};

	recognition.onresult = async (event) => {
		const transcript = event.results[event.results.length - 1][0].transcript;
		await getBotResponse(transcript);
		return;
	};

	useEffect(() => {
		setResponse('Welcome to the coffee drive thru. What can I get you?');
	}, []);

	if (idle) {
		return (
			<div className="flex flex-col items-center justify-center h-screen w-screen bg-red-100">
				<div className="flex flex-col items-center justify-around h-2/3 w-1/4 bg-red-900 p-8 rounded-md gap-4">
					<div className="flex flex-col text-center gap-2">
						<h1 className="text-4xl font-bold text-white">Welcome</h1>
						<h2 className="textlxl font-bold text-white">
							We'll be with you shortly
						</h2>
					</div>
				</div>
			</div>
		);
	}

	recognition.onstart = () => setIsRecordingVoice(true);
	recognition.onend = () => setIsRecordingVoice(false);

	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen bg-red-100">
			<div className="flex flex-col items-center w-1/2 bg-red-900 justify-between p-8 rounded-md">
				<BotEyes />
				<div className="flex flex-col w-full h-full bg-white rounded-md p-8 gap-4 my-8 min-h-72">
					<div className="w-full border-b-2 border-gray-300 flex flex-col gap-2 pb-4">
						<h2>Order items</h2>
					</div>
					<ul className="flex flex-col gap-2">
						{orderItems.map((item) => (
							<OrderItem
								key={orderItems.indexOf(item)}
								name={item.name}
								price={item.price}
								extras={item.extras}
							/>
						))}
					</ul>
				</div>
				{orderComplete ? (
					<div>
						<h1 className="text-xl font-bold text-white">
							Thank you for your order. Please drive around to the payment window.
						</h1>
						<img
							src="https://cdn-icons-png.flaticon.com/256/12071/12071357.png"
							alt="arrow-left"
							className="animate-pulse"
						/>
					</div>
				) : (
					<div className="flex flex-col w-full h-full p-8 gap-4 my-8">
						<h1 className="text-xl font-bold text-white my-2">
							{loading ? (
								<div className="flex items-center justify-center">
									<FaSpinner className="animate-spin" />
								</div>
							) : response ? (
								response
							) : (
								'What can I get you?'
							)}
						</h1>
						<textarea
							className="w-full h-full rounded-md p-4 text-gray-800"
							placeholder="Type your request here"
							onChange={(e) => setUserRequest(e.target.value)}
						></textarea>
						<button
							className="bg-red-600 rounded-md p-4 text-white flex items-center justify-center text-4xl min-w-48 self-center"
							onClick={() => getBotResponse(userRequest)}
						>
							Send
						</button>

						<button
							className="bg-red-600 rounded-md p-4 text-white flex items-center justify-center text-4xl min-w-48 self-center"
							onClick={() => {
								if (isRecordingVoice) {
									recognition.stop();
								} else {
									recognition.start();
								}
							}}
						>
							{isRecordingVoice ? <FaMicrophone /> : <FaMicrophoneSlash />}
						</button>
						{/* 
						<audio
							controls
							src={`http://localhost:8080/say?prompt=${response}`}
							autoPlay
							hidden
						></audio> */}
					</div>
				)}
			</div>
		</div>
	);
}

export default View;
