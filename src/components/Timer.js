import React, { useState, useEffect, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

const Timer = () => {
	const settingsInfo = useContext(SettingsContext);

	const [paused, setPaused] = useState(true);
	const [secLeft, setSecLeft] = useState(0);
	const [mode, setMode] = useState("work"); // work/break/null

	const secLeftRef = useRef(secLeft);
	const pausedRef = useRef(paused);
	const modeRef = useRef(mode);

	const tick = () => {
		secLeftRef.current--;
		setSecLeft(secLeftRef.current);
	};

	useEffect(() => {
		const switchMode = () => {
			const nextMode = modeRef.current === "work" ? "break" : "work";
			const nextSec =
				nextMode === "work"
					? settingsInfo.workMins * 60
					: settingsInfo.breakMins * 60;

			setMode(nextMode);
			modeRef.current = nextMode;

			setSecLeft(nextSec);
			secLeftRef.current = nextSec;
		};

		secLeftRef.current = settingsInfo.workMins * 60;
		setSecLeft(secLeftRef.current);

		const interval = setInterval(() => {
			console.log("init");
			if (pausedRef.current) return;
			if (secLeftRef.current === 0) {
				return switchMode();
			}
			tick();
		}, 1000);

		return () => clearInterval(interval);
	}, [settingsInfo]);

	const totalSec =
		mode === "work"
			? settingsInfo.workMins * 60
			: settingsInfo.breakMins * 60;
			
	const percentage = Math.round((secLeft / totalSec) * 100);

	const mins = Math.floor(secLeft / 60);
	let seconds = secLeft % 60;
	if (seconds < 10) seconds = "0" + seconds;

	return (
		<div>
			<CircularProgressbar
				value={percentage}
				text={mins + ":" + seconds}
				styles={buildStyles({
					rotation: 0.25,
					strokeLinecap: "round",
					textColor: "#fff",
					pathColor: mode === "work" ? red : green,
					tailColor: "rgba(255, 255, 255, 0.2)",
				})}
			/>

			<div style={{ marginTop: "20px" }}>
				{paused ? (
					<PlayButton
						onClick={() => {
							setPaused(false);
							pausedRef.current = false;
						}}
					/>
				) : (
					<PauseButton
						onClick={() => {
							setPaused(true);
							pausedRef.current = true;
						}}
					/>
				)}
			</div>

			<div style={{ marginTop: "20px" }}>
				<SettingsButton
					onClick={() => settingsInfo.setShowSettings(true)}
				/>
			</div>
		</div>
	);
};

export default Timer;
