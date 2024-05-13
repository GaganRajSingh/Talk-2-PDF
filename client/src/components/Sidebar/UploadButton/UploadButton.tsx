import "./UploadButton.css";
import { useAppDispatch } from "../../../store/hooks";
import { uploadFile } from "../../../utils/api";
import { addFile } from "../../../store/reducer";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useRef } from "react";

const UploadButton = () => {
	const dispatch = useAppDispatch();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			let fileName: string = e.target.files[0].name;
			uploadFile(e.target.files[0])
				.then((response: string) => {
					dispatch(addFile(fileName));
				})
				.catch((error: string) => {
					alert("Error: " + error);
				});
		}
	};

	const handleFabClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className="uploadButton flex">
			<Fab
				color="primary"
				size="small"
				className="importButton"
				aria-label="add"
				onClick={handleFabClick}
			>
				<AddIcon />
			</Fab>
			<input
				type="file"
				ref={fileInputRef}
				accept=".pdf"
				style={{ display: "none" }}
				onChange={handlePDFUpload}
			/>
			<div className="uploadText">New PDF</div>
		</div>
	);
};

export default UploadButton;
