import { Row } from "reactstrap";

export default function Loading() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Row>
				<div className="spinner-grow me-2" role="status">
					<span className="sr-only"></span>
				</div>
				<div className="spinner-grow text-warning me-2" role="status">
					<span className="sr-only"></span>
				</div>
				<div className="spinner-grow text-info me-2" role="status">
					<span className="sr-only"></span>
				</div>
				<div className="spinner-grow text-danger" role="status">
					<span className="sr-only"></span>
				</div>
			</Row>
		</div>
	);
}
