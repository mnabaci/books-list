import { Container } from "reactstrap";
import CategoriesPreview from "../../components/categoriesPreview/categoriesPreview";
import categories from "../../data/categories.json";

export default function HomePage() {
	return (
		<Container>
			<CategoriesPreview title="Subjects" categoryCards={categories.subjects} />
			<CategoriesPreview title="Artists" categoryCards={categories.artists} />
			<CategoriesPreview title="Titles" categoryCards={categories.titles} />
		</Container>
	);
}
