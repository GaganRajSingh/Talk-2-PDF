import { ChatMessagesProp } from "./ChatMessages.types";
import "./ChatMessages.css";

const ChatMessages = ({ messages }: ChatMessagesProp) => {
	return (
		<>
			{messages.map((message, index) => {
				return (
					<div className="messageArea">
						{index % 2 ? (
							<div className="answer bubble">
								<span>{message}</span>
							</div>
						) : (
							<div className="question bubble">
								<span>{message}</span>
							</div>
						)}
					</div>
				);
			})}
		</>
	);
};

export default ChatMessages;
