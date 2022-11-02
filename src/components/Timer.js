import { useEffect, useState } from "react";
import "../timer.scss";
import RunningButton from "./RunningButton";
import { Button } from "react-bootstrap";

function Timer(props) {
	const [time, setTime] = useState();
	const setCurrentTime = (newTime) => {
		setTime(newTime);
		setTimeout(setCurrentTime, 500, new Date().toLocaleTimeString());
	};
	useEffect(() => {
		setCurrentTime(new Date().toLocaleTimeString());
	});
	const {
		statusProcedure,
		startProcedureTime,
		startProcedureFn,
		statusTrial,
		startTrialFn,
		endTrialFn,
		resetFn,
	} = props;

	return (
		<div className="card">
			<h5 className="card-header">Timer {startProcedureTime}</h5>
			<div
				style={{ marginLeft: "20px", marginRight: "20px" }}
				className="card-body"
			>
				<div id="clock">{time} </div>
				{statusProcedure ? (
					<RunningButton variant="primary" label={"Running..."} />
				) : (
					<Button variant="primary" size="lg" onClick={startProcedureFn}>
						Start
					</Button>
				)}
				<Button variant="danger" size="lg" onClick={resetFn}>
					Reset
				</Button>
				<br/><br/><br/>
				{statusTrial ? (
					<RunningButton variant="success" label="Running Trial..." />
				) : (
					<Button variant="success" size="lg" onClick={startTrialFn}>
						Start Trial
					</Button>
				)}
				<Button variant="secondary" size="lg" onClick={endTrialFn}>
					End Trial
				</Button>
				
			</div>
			<div className="card-footer">
				Elapsed time: <strong></strong>
			</div>
		</div>
	);
}

export default Timer;
