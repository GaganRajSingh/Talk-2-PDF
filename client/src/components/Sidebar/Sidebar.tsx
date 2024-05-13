import "./Sidebar.css";
import { SidebarProps } from "./Sidebar.types";
import UploadButton from "./UploadButton/UploadButton";
import FileList from "./FileList/FileList";
import Logo from "./Logo/Logo";

const Sidebar = (props: SidebarProps) => {
	return (
		<div className="sidebar flex">
			<Logo />
			<FileList />
			<UploadButton />
		</div>
	);
};

export default Sidebar;
