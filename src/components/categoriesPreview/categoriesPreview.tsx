import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import CategoryCard from "../categoryCard/categoryCard";
import categoriesPreviewStyles from "./categoriesPreview.module.css";
export default function CategoriesPreview({ title, categoryCards }: Props) {
	return (
		<Card color="light" className={`${categoriesPreviewStyles.card}`}>
			<CardBody>
				<CardTitle
					tag="h4"
					className={`pb-2 text-center text-uppercase border-bottom border-secondary text-dark ${categoriesPreviewStyles.title}`}
				>
					{title}
				</CardTitle>
			</CardBody>
			<Row>
				{categoryCards.map((card, i) => (
					<Col md="4" key={i}>
						<CategoryCard
							title={card.title}
							imgSrc={card.imgSrc}
							query={card.query}
						/>
					</Col>
				))}
			</Row>
		</Card>
	);
}

interface Props {
	title: string;
	categoryCards: CategoryCardProps[];
}

interface CategoryCardProps {
	title: string;
	imgSrc: string;
	query?: string;
}
