import { useEffect, useRef, useState } from "react";
import { ChatProps } from "./Chat.types";
import { sendQuery } from "../../utils/api";
import "./Chat.css";
import ChatMessages from "./ChatMessages/ChatMessages";
import SendIcon from "@mui/icons-material/Send";
import { Icon } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addChatMessages } from "../../store/reducer";

const Chat = (props: ChatProps) => {
	const dispatch = useAppDispatch();
	const [queryText, setQueryText] = useState<string>("");
	const [chatMessages, setChatMessages] = useState<string[]>([]);
	const chatBoxRef = useRef<HTMLDivElement>(null);

	const currentChatIndex = useAppSelector(
		(state) => state.chat.currentChatIndex
	);

	const allPDFChats = useAppSelector((state) => state.chat.chatMessages);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryText(e.target.value);
	};

	const handleSubmit = () => {
		if (currentChatIndex == -1) {
			alert("Upload PDF first!");
			setQueryText("");
			return;
		}

		const query: string = queryText;
		setChatMessages(chatMessages.concat([query]));
		setQueryText("");
		sendQuery(query, currentChatIndex)
			.then((response: string) => {
				setChatMessages(chatMessages.concat([query, response]));
			})
			.catch((error: string) => {
				console.error("Error:", error);
				setChatMessages(chatMessages.concat([query, error]));
			});
	};

	useEffect(() => {
		// Scroll to bottom
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
		// Set updated chat messages in redux
		dispatch(
			addChatMessages({
				index: currentChatIndex,
				newChat: chatMessages,
			})
		);
	}, [chatMessages]);

	useEffect(() => {
		setChatMessages(allPDFChats[currentChatIndex]);
	}, [currentChatIndex]);

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
					autoFocus
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
