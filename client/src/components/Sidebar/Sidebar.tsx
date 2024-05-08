import "./Sidebar.css";
import { SidebarProps } from "./Sidebar.types";
import { uploadFile } from "../../utils/api";
import { useState } from "react";

const Sidebar = (props: SidebarProps) => {
	const [uploadMessage, showUploadMessage] = useState<string>("");

	const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			uploadFile(e.target.files[0])
				.then((response: string) => {
					showUploadMessage(response);
				})
				.catch((error: string) => {
					console.log("Error: " + error);
				});
		}
	};
	return (
		<div className="sidebar">
			<div className="uploadButton">
				<input type="file" onChange={handlePDFUpload} accept=".pdf" />
			</div>
			<div className="uploadMessage">
				<p>{uploadMessage}</p>
			</div>
		</div>
	);
};

export default Sidebar;
