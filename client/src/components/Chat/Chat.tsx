import { useState } from "react";
import { ChatProps } from "./Chat.types";
import { sendQuery } from "../../utils/api";
import "./Chat.css";

const Chat = (props: ChatProps) => {
	const [queryText, setQueryText] = useState<string>("");
	const [queryResponse, setQueryResponse] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryText(e.target.value);
	};
	const handleSubmit = () => {
		sendQuery(queryText)
			.then((response: string) => {
				setQueryResponse(response);
			})
			.catch((error: string) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="chat flex">
			<div>{queryResponse}</div>
			<div className="query flex">
				<input
					value={queryText}
					onChange={handleInputChange}
					type="text"
					className="queryInput margin_10"
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
