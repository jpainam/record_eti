import React from "react";
import { Button } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

function RunningButton(props) {
	const { label, variant } = props;
	return (
		<Button size="lg" variant={variant} disabled style={{ cursor: "default" }}>
			<Spinner animation="border" /> {label}
		</Button>
	);
}

export default RunningButton;
