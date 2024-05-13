import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/ChatArea/Chat";
import { clearModel } from "./utils/api";

function App() {
	clearModel();
	return (
		<div className="App">
			<Sidebar />
			<Chat />
		</div>
	);
}

export default App;
