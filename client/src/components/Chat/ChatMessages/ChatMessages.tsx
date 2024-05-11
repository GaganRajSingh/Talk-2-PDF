import { ChatMessagesProp } from "./ChatMessages.types";
import "./ChatMessages.css";

const ChatMessages = ({ messages }: ChatMessagesProp) => {
	return (
		<>
			{messages.map((message, index) => {
				return index % 2 ? (
					<div className="messageArea flexStart" key={index}>
						<div className="answer bubble">
							<span>{message}</span>
						</div>
					</div>
				) : (
					<div className="messageArea flexEnd" key={index}>
						<div className="question bubble">
							<span>{message}</span>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ChatMessages;
