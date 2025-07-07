import { useEffect, useState } from 'react';

let recognition = new (window.SpeechRecognition ||
	window.webkitSpeechRecognition)();

if ('webkitSpeechRecognition' in window) {
	recognition = new window.webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.lang = 'en-US';
}

const useSpeechRecognition = () => {
	const [text, setText] = useState('');
	const [isListening, setIsListening] = useState(false);

	useEffect(() => {
		if (!recognition) return;

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const transcript = event.results[event.results.length - 1][0].transcript;
			setText(transcript);
			recognition.stop();
			setIsListening(false);
		};
	}, []);

	const startListening = () => {
		if (!recognition) return;
		setText('');
		setIsListening(true);
		recognition.start();
	};

    const stopListening = () => {
		if (!recognition) return;
		setIsListening(false);
		recognition.stop();
	};
};

export default useSpeechRecognition;
