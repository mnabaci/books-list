import { useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap";
import { Status } from "../../common/constants/status";
import Alert from "../../components/alert/alert";
import Loading from "../../components/loading/loading";
import PageNavigation from "../../components/pageNavigation/pageNavigation";
import listPageStyles from "./listPage.module.css";

export default function ListPage({
	status,
	title,
	totalPages,
	items,
	currentPage,
	search,
	alert,
	renderCard,
	setAlert,
	changePage,
}: Props) {
	const [searchText, setSearchText] = useState("");

	const chunkSize = 3;
	const rows = [] as JSX.Element[];
	if (items) {
		for (let i = 0; i < items.length; i += chunkSize) {
			const chunk = items.slice(i, i + chunkSize);
			rows.push(
				<Row key={i} className="my-3">
					{chunk.map((data, j) => (
						<Col md="4" key={j}>
							{renderCard(data)}
						</Col>
					))}
				</Row>
			);
		}
	}

	return status === Status.Pending || status === Status.Idle ? (
		<Container
			className={`d-flex justify-content-center ${listPageStyles.container}`}
		>
			<Loading />
		</Container>
	) : (
		<Container className={`d-flex flex-column ${listPageStyles.container}`}>
			<Row className="mt-2">
				<Col md={{ offset: 4, size: 4 }}>
					<h1 className="text-center border-bottom border-warning">{title}</h1>
				</Col>
			</Row>
			<Row className="my-2 justify-content-center align-items-center">
				<Col md={6}>
					<InputGroup>
						<Input
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && changePage(1, searchText)}
						/>
						<Button
							hidden={!searchText}
							className={`btn-danger ${listPageStyles.clearBtn}`}
							disabled={!searchText}
							onClick={(e) => {
								e.preventDefault();
								setSearchText("");
								if (search) changePage(1);
							}}
						>
							<FontAwesomeIcon icon={faXmark} />
						</Button>
						<Button
							disabled={!searchText}
							onClick={(e) => {
								e.preventDefault();
								changePage(1, searchText);
							}}
						>
							<FontAwesomeIcon
								size="sm"
								className="me-1"
								icon={faMagnifyingGlass}
							/>
							Search
						</Button>
					</InputGroup>
				</Col>
			</Row>
			{rows}
			{!rows ||
				(rows.length === 0 && (
					<Row className="flex-grow-1 align-items-center">
						<Col className="d-flex justify-content-center">
							<img
								className={`${listPageStyles.nothingFound}`}
								src="/assetts/images/noresults.png"
								alt="nothing found"
							/>
						</Col>
					</Row>
				))}
			{totalPages > 1 && (
				<Row>
					<PageNavigation
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChanged={(page) => {
							changePage(page, search);
						}}
					/>
				</Row>
			)}
			<Alert
				message={alert}
				isOpen={alert !== undefined && alert !== ""}
				toggle={() => setAlert("")}
			/>
		</Container>
	);
}

interface Props {
	status: Status;
	title: string;
	totalPages: number;
	currentPage: number;
	search?: string;
	items?: CardProps[];
	alert: string;
	renderCard: (item: CardProps) => JSX.Element;
	setAlert: (message: string) => void;
	changePage: (page: number, search?: string) => void;
}

interface CardProps {
	title: string;
	subTitle?: string;
	imgSrc: string;
	id: number;
	content?: string;
	author?: string;
	date?: Date;
}
