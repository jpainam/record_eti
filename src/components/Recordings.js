import React from "react";
import Table from "react-bootstrap/Table";

function Recordings(props) {
	const { data } = props;
	return (
		<div className="card">
			<h5 className="card-header">Recordings</h5>
			<div className="card-body">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Participant</th>
							<th>Session</th>
							<th>StartTime</th>
							<th>RecordingStartTime</th>
							<th>RecordingEndTime</th>
						</tr>
					</thead>
					<tbody>
						{data.map((col, index) => {
							return col["RecordingEndTime"] !== "" ? (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{col["Participant"]}</td>
									<td>{col["Session"]}</td>
									<td>{col["StartTime"]}</td>
									<td>{col["RecordingStartTime"]}</td>
									<td>{col["RecordingEndTime"]}</td>
								</tr>
							) : (
								<></>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className="card-footer">
				Current time: <strong>{new Date().toLocaleTimeString()}</strong>
			</div>
		</div>
	);
}
export default Recordings;
