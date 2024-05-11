import "./Sidebar.css";
import { SidebarProps } from "./Sidebar.types";
import { uploadFile } from "../../utils/api";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Skeleton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const Sidebar = (props: SidebarProps) => {
	const [fileName, setFileName] = useState<string>("");
	const [showFile, setShowFile] = useState<boolean>(false);

	const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			let fileName: string = e.target.files[0].name;
			uploadFile(e.target.files[0])
				.then((response: string) => {
					setFileName(fileName);
					setShowFile(true);
				})
				.catch((error: string) => {
					setFileName("Error: " + error);
				});
		}
	};

	return (
		<div className="sidebar">
			<div className="uploadButton">
				<Button
					component="label"
					role={undefined}
					variant="contained"
					tabIndex={-1}
					startIcon={<CloudUploadIcon />}
				>
					Upload PDF
					<VisuallyHiddenInput
						type="file"
						onChange={handlePDFUpload}
						accept=".pdf"
					/>
				</Button>
			</div>
			{showFile ? (
				<div className="uploadedFile">
					<p>{fileName}</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default Sidebar;
