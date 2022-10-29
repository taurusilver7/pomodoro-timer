import React, { useContext } from "react";
import ReactSlider from "react-slider";
import "../slider.css";
import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";

const Settings = () => {
	const settingsInfo = useContext(SettingsContext);
	return (
		<div style={{ textAlign: "left" }}>
			<label>Work minutes: {settingsInfo.workMins}:00</label>
			<ReactSlider
				className={"slider"}
				thumbClassName={"thumb"}
				trackClassName={"track"}
				value={settingsInfo.workMins}
				min={1}
				max={120}
				onChange={(val) => settingsInfo.setWorkMins(val)}
			/>
			<label>break minutes: {settingsInfo.breakMins}:00</label>
			<ReactSlider
				className={"slider green"}
				thumbClassName={"thumb"}
				trackClassName={"track"}
				value={settingsInfo.breakMins}
				min={1}
				max={120}
				onChange={(val) => settingsInfo.setBreakMins(val)}
			/>

			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<BackButton onClick={() => settingsInfo.setShowSettings(false)} />
			</div>
		</div>
	);
};

export default Settings;
