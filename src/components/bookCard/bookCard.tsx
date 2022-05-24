import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
	Card,
	CardBody,
	CardSubtitle,
	CardTitle,
	Col,
	Container,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
} from "reactstrap";
import bookCardStyles from "./bookCard.module.css";

export default function BookCard({
	title,
	imgSrc,
	subTitle,
	author,
	date,
	content,
}: Props) {
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<Card
				className={`${bookCardStyles.card}`}
				onClick={() => setShowModal(true)}
			>
				<img
					className={`rounded border-warning ${bookCardStyles.image}`}
					alt={title}
					src={imgSrc}
				/>
				<CardBody>
					<CardTitle tag="h5" className={`pb-1 ${bookCardStyles.title}`}>
						<div
							className={`text-dark`}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
					</CardTitle>
					{subTitle && (
						<CardSubtitle
							className={`mb-2 text-muted ${bookCardStyles.subTitle}`}
							dangerouslySetInnerHTML={{ __html: subTitle }}
							tag="h6"
						/>
					)}
				</CardBody>
			</Card>
			<Modal
				isOpen={showModal}
				centered
				toggle={() => setShowModal(!showModal)}
			>
				<ModalHeader
					close={
						<button
							className={bookCardStyles.close}
							onClick={() => setShowModal(false)}
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					}
					toggle={() => setShowModal(!showModal)}
				>
					<div dangerouslySetInnerHTML={{ __html: title }} />
				</ModalHeader>
				<ModalBody className="px-2">
					<img
						alt={title}
						src={imgSrc}
						width="100%"
						className={`rounded border-warning ${bookCardStyles.image}`}
					/>
					<Container className="mt-2">
						{(date || author) && (
							<Row className="my-2 border-bottom pb-2">
								{date && (
									<>
										<Col xs="3" md="2" className="text-secondary">
											Published:
										</Col>
										<Col xs="9" md="4">
											<div
												dangerouslySetInnerHTML={{
													__html: new Date(date).toDateString(),
												}}
											/>
										</Col>
									</>
								)}
								{author && (
									<>
										<Col xs="3" md="2" className="text-secondary">
											Author:
										</Col>
										<Col xs="9" md="4">
											<div
												dangerouslySetInnerHTML={{
													__html: author,
												}}
											/>
										</Col>
									</>
								)}
							</Row>
						)}
						{subTitle && (
							<Row className="mb-2">
								<Col>
									<h6 dangerouslySetInnerHTML={{ __html: subTitle }} />
								</Col>
							</Row>
						)}
						{content && (
							<Row>
								<Col>
									<div dangerouslySetInnerHTML={{ __html: content }} />
								</Col>
							</Row>
						)}
					</Container>
				</ModalBody>
			</Modal>
		</>
	);
}

interface Props {
	title: string;
	imgSrc: string;
	subTitle?: string;
	content?: string;
	author?: string;
	date?: Date;
}
