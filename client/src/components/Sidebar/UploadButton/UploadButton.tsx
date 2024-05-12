import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "./Constants";
import "./UploadButton.css";
import { useAppDispatch } from "../../../store/hooks";
import { uploadFile } from "../../../utils/api";
import { addFile } from "../../../store/reducer";

const UploadButton = () => {
	const dispatch = useAppDispatch();

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

	return (
		<div className="uploadButton">
			<Button
				component="label"
				role={undefined}
				variant="contained"
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
	);
};

export default UploadButton;
