import "./FileList.css";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { setIndex } from "../../../store/reducer";

const FileList = () => {
	const dispatch = useAppDispatch();
	const fileList = useAppSelector((state) => state.chat.pdfFiles);
	const currentIndex = useAppSelector((state) => state.chat.currentChatIndex);
	const [activeFile, setActiveFile] = useState<number>(currentIndex);

	useEffect(() => {
		setActiveFile(currentIndex);
	}, [currentIndex]);

	const updateActiveFile = (index: number) => {
		dispatch(setIndex(index));
	};

	return (
		<div>
			{fileList.map((fileName, index) => {
				var classes = "file" + (activeFile === index ? " active" : "");
				return (
					<div
						className={classes}
						key={index}
						onClick={() => updateActiveFile(index)}
					>
						{fileName}
					</div>
				);
			})}
		</div>
	);
};

export default FileList;
