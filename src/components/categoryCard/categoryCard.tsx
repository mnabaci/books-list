import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { Routes } from "../../common/constants/routes";
import categoryCardStyles from "./categoryCard.module.css";

export default function CategoryCard({ title, imgSrc, query }: Props) {
	return (
		<Card className={`${categoryCardStyles.card}`}>
			<Link
				to={`${Routes.Illustrations}${query ? `?${query}` : ""}`}
				className={`${categoryCardStyles.link}`}
			>
				<img
					className={`rounded border-warning ${categoryCardStyles.image}`}
					alt={title}
					src={imgSrc}
				/>
			</Link>
		</Card>
	);
}

interface Props {
	title: string;
	imgSrc: string;
	query?: string;
}
