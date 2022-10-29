import { useState } from "react";
import "./App.css";
import Settings from "./components/Settings";
import SettingsContext from "./components/SettingsContext";
import Timer from "./components/Timer";

function App() {
	const [showSettings, setShowSettings] = useState(false);
	const [workMins, setWorkMins] = useState(45);
	const [breakMins, setBreakMins] = useState(15);
	return (
		<main>
			<SettingsContext.Provider
				value={{ workMins, breakMins, setWorkMins, setBreakMins, showSettings, setShowSettings }}
			>
				{showSettings ? <Settings /> : <Timer />}
			</SettingsContext.Provider>
		</main>
	);
}

export default App;
