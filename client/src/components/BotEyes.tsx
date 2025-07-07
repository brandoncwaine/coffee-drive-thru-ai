function BotEyes() {
	return (
		<div className="flex flex-row gap-4">
			<div
				className="bg-white rounded-sm w-24 h-16 flex items-center justify-center"
				id="bot_eye"
			>
				<div className="bg-zinc-800 rounded-sm w-8 h-12" id="bot_pupil" />
			</div>
			<div
				className="bg-white rounded-sm w-24 h-16 flex items-center justify-center"
				id="bot_eye"
			>
				<div className="bg-zinc-800 rounded-sm w-8 h-12" id="bot_pupil" />
			</div>
		</div>
	);
}

export default BotEyes;
