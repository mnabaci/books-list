import { Container } from "reactstrap";
import CategoriesPreview from "../../components/categoriesPreview/categoriesPreview";

export default function HomePage() {
	return (
		<Container>
			<CategoriesPreview
				title="Subjects"
				categoryCards={[
					{
						title: "Humor",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/humor-home.v12.png",
						query: "subject=730",
					},
					{
						title: "Animals",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/animals-home.v13.png",
						query: "subject=42",
					},
					{
						title: "Narratives",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/narratives-home.v12.png",
						query: "subject=11",
					},
				]}
			/>
			<CategoriesPreview
				title="Artists"
				categoryCards={[
					{
						title: "Tony Johannot",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/johannot-home.png",
						query: "artist=828",
					},
					{
						title: "Howard Pyle",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/pyle-home.png",
						query: "artist=2053",
					},
					{
						title: "Harry Clarke",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/clarke-home.png",
						query: "artist=2075",
					},
				]}
			/>
			<CategoriesPreview
				title="Titles"
				categoryCards={[
					{
						title: "Notre-Dame De Paris",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/notre-dame-home.png",
						query: "title=2986",
					},
					{
						title: "Once a week",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/once-a-week-home.v11.png",
						query: "title=2867",
					},
					{
						title: "Baron Munchausen",
						imgSrc:
							"https://www.oldbookillustrations.com/wp-content/themes/obi_theme/homegrid/img/munchausen-home.v12.png",
						query: "title=3746",
					},
				]}
			/>
		</Container>
	);
}
