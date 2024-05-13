import { HeaderProps } from "./Header.types";
import "./Header.css";

const Header = ({ fileName }: HeaderProps) => {
	return (
		<div className="chatHeader flex">
			{fileName ? (
				<div className="pdfFileName flex">📑 {fileName}</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Header;
