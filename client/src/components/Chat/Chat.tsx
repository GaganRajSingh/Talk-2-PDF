import { useState } from "react";
import { ChatProps } from "./Chat.types";
import { sendQuery } from "../../utils/api";
import "./Chat.css";
import ChatMessages from "./ChatMessages/ChatMessages";

const Chat = (props: ChatProps) => {
	const [queryText, setQueryText] = useState<string>("");
	const [chatMessages, setChatMessages] = useState<string[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryText(e.target.value);
	};
	const handleSubmit = () => {
		const query: string = queryText;

		setQueryText("");
		setChatMessages(chatMessages.concat([query]));

		sendQuery(query)
			.then((response: string) => {
				setChatMessages(chatMessages.concat([query, response]));
			})
			.catch((error: string) => {
				console.error("Error:", error);
				setChatMessages(chatMessages.concat([query, error]));
			});
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") handleSubmit();
	};

	return (
		<div className="chat flex">
			<div className="chatBox">
				<ChatMessages messages={chatMessages} />
			</div>
			<div className="queryBox flex">
				<input
					value={queryText}
					onChange={handleInputChange}
					type="text"
					className="queryInput margin_10"
					onKeyUp={handleKeyUp}
				></input>
				<button
					onClick={handleSubmit}
					className="submitButton margin_10"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Chat;
