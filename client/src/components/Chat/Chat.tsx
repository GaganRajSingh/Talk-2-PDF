import { useEffect, useRef, useState } from "react";
import { ChatProps } from "./Chat.types";
import { sendQuery } from "../../utils/api";
import "./Chat.css";
import ChatMessages from "./ChatMessages/ChatMessages";
import SendIcon from "@mui/icons-material/Send";
import { Icon } from "@mui/material";

const Chat = (props: ChatProps) => {
	const [queryText, setQueryText] = useState<string>("");
	const [chatMessages, setChatMessages] = useState<string[]>([]);
	const chatBoxRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, [chatMessages]);

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") handleSubmit();
	};

	return (
		<div className="chat flexColumn">
			<div className="chatBox" ref={chatBoxRef}>
				<ChatMessages messages={chatMessages} />
			</div>
			<div className="queryBox flex">
				<input
					value={queryText}
					onChange={handleInputChange}
					type="text"
					className="queryInput margin_10"
					onKeyUp={handleKeyUp}
					placeholder="Talk to your PDF"
				></input>

				<Icon
					component={SendIcon}
					onClick={handleSubmit}
					fontSize="large"
					className="iconColor"
				/>
			</div>
		</div>
	);
};

export default Chat;
