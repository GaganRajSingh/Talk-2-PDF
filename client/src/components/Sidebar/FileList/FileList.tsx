import "./FileList.css";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useState } from "react";
import { setIndex, deleteFile } from "../../../store/reducer";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@mui/material";
import { deletePDF } from "../../../utils/api";

const FileList = () => {
	const dispatch = useAppDispatch();
	const fileList = useAppSelector((state) => state.chat.pdfFiles);
	const currentIndex = useAppSelector((state) => state.chat.currentChatIndex);
	const [hoverIndex, setHoverIndex] = useState<number>(-1);

	const updateActiveFile = (index: number) => {
		dispatch(setIndex(index));
	};

	const handleDelete = (index: number) => {
		deletePDF(index);
		dispatch(deleteFile(index));
	};

	return (
		<div className="fileList">
			{fileList.map((fileName, index) => {
				return (
					<div
						className={
							currentIndex === index ? "file active" : "file"
						}
						key={index}
						onClick={() => updateActiveFile(index)}
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(-1)}
					>
						{fileName.replaceAll(".pdf", "")}
						<Icon
							component={CloseIcon}
							className={
								hoverIndex == index
									? "deleteIcon"
									: "deleteIcon hide"
							}
							onClick={(e) => {
								e.stopPropagation();
								handleDelete(index);
							}}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default FileList;
