import { useState } from "react";
import {
	Card,
	CardBody,
	CardSubtitle,
	CardTitle,
	Modal,
	ModalBody,
	ModalHeader,
} from "reactstrap";
import bookCardStyles from "./bookCard.module.css";

export default function BookCard({ title, imgSrc, subTitle }: Props) {
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
							×
						</button>
					}
					toggle={() => setShowModal(!showModal)}
				>
					<div dangerouslySetInnerHTML={{ __html: title }} />
				</ModalHeader>
				<ModalBody>
					<img
						alt={title}
						src={imgSrc}
						width="100%"
						className={`rounded border-warning ${bookCardStyles.image}`}
					/>
				</ModalBody>
			</Modal>
		</>
	);
}

interface Props {
	title: string;
	imgSrc: string;
	subTitle?: string;
}
