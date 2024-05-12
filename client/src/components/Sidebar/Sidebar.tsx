import "./Sidebar.css";
import { SidebarProps } from "./Sidebar.types";
import UploadButton from "./UploadButton/UploadButton";
import FileList from "./FileList/FileList";

const Sidebar = (props: SidebarProps) => {
	return (
		<div className="sidebar">
			<UploadButton />
			<FileList />
		</div>
	);
};

export default Sidebar;
