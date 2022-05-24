import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Routes } from "../../common/constants/routes";
import notFoundPageStyles from "./notFoundPage.module.css";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<Container
			className={`d-flex flex-column justify-content-center align-items-center ${notFoundPageStyles.container}`}
		>
			<img
				className={`${notFoundPageStyles.image}`}
				src="/assetts/images/404.png"
				alt="not found"
			/>
			<Button
				className="mt-5 btn-warning"
				onClick={() => navigate(Routes.Home, { replace: true })}
			>
				Home Page
			</Button>
		</Container>
	);
}
