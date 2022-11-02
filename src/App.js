import React, { useState, useEffect } from "react";
import "./App.scss";
import Recordings from "./components/Recordings";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { CSVLink, CSVDownload } from "react-csv";
import Timer from "./components/Timer";
import { Alert, Button } from "react-bootstrap";

function App() {
	const [data, setData] = useState([]);
	const [currentTrial, setCurrentTrial] = useState({});

	const [startProcedureTime, setStartProcedureTime] = useState(
		new Date().toLocaleTimeString()
	);
	const [statusProcedure, setStatusProcedure] = useState(false);
	const [statusTrial, setStatusTrial] = useState(false);

	const startProcedureFn = (e) => {
		setAlertMessage();
		if (!participant || !session) {
			setAlertMessage("Participant or Session field is required");
			return;
		}
		const t = new Date().toLocaleTimeString();
		setCurrentTrial({
			Participant: participant,
			Session: session,
			StartTime: t,
		});
		setStartProcedureTime(t);
		setStatusProcedure(true);
	};
	const startTrialFn = (e) => {
		setAlertMessage();
		if (!statusProcedure) {
			setAlertMessage("Start the procedure first");
			return;
		}
		const t = new Date().toLocaleTimeString();
		setCurrentTrial({ ...currentTrial, RecordingStartTime: t });
		setStatusTrial(true);
	};
	const endTrialFn = (e) => {
		if (!statusTrial) {
			return;
		}
		const t2 = new Date().toLocaleTimeString();
		setCurrentTrial({ ...currentTrial, RecordingEndTime: t2 });
		setStatusTrial(false);
		setAlertMessage();
	};
	useEffect(() => {
		setData([...data, currentTrial]);
		console.log(data);
		console.log(currentTrial);
	}, [currentTrial["RecordingEndTime"]]);

	const resetFn = (e) => {
		setStartProcedureTime("Not Started");
		setStatusProcedure(false);
		setStatusTrial(false);
		setAlertMessage();
	};
	const [participant, setParticipant] = useState("LC10");
	const [session, setSession] = useState("Day 1");
	const [alertMessage, setAlertMessage] = useState("");

	const headers = [
		{ label: "Participant", key: "Participant" },
		{ label: "Session", key: "Session" },
		{ label: "StartTime", key: "StartTime" },
		{ label: "RecordingStartTime", key: "RecordingStartTime" },
		{ label: "RecordingEndTime", key: "RecordingEndTime" },
	];

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-sm-7">
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1">Participant</InputGroup.Text>
						<Form.Control
							placeholder="Participant (e.g. LC10)"
							aria-label="participant"
							value={participant}
							onChange={(e) => setParticipant(e.target.value)}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1">Session</InputGroup.Text>
						<Form.Control
							placeholder="Session (e.g. LC10 Day 1)"
							aria-label="Session"
							aria-describedby="basic-addon2"
							value={session}
							onChange={(e) => setSession(e.target.value)}
						/>
					</InputGroup>
					<CSVLink
						filename={"eti_recordings.csv"}
						className="btn btn-primary"
						separator={","}
						data={data}
						headers={headers}
					>
						Export (.csv) the recordings
					</CSVLink>
					<Recordings data={data} />
				</div>
				<div className="col-sm-5">
					{alertMessage ? (
						<Alert variant="danger"> {alertMessage}</Alert>
					) : (
						<></>
					)}
					<Timer
						statusProcedure={statusProcedure}
						startProcedureTime={startProcedureTime}
						startProcedureFn={startProcedureFn}
						statusTrial={statusTrial}
						alertMessage={alertMessage}
						startTrialFn={startTrialFn}
						endTrialFn={endTrialFn}
						resetFn={resetFn}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;

