import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import { useAppDispatch } from "../../app/hooks";
import { Routes } from "../../common/constants/routes";
import { Status } from "../../common/constants/status";
import Loading from "../../components/loading/loading";
import { isLoggedIn, logIn } from "../../features/auth/authSlice";
import ApiService from "../../services/apiService";
import loginPageStyles from "./loginPage.module.css";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [status, setStatus] = useState(Status.Idle);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loggedIn = dispatch(isLoggedIn());

	if (loggedIn) return <Navigate to={Routes.Home} replace />;

	const onFormSubmit = async () => {
		setStatus(Status.Pending);
		let { data, isSuccess, message } = await ApiService.auth(
			username,
			password
		);

		if (isSuccess) {
			dispatch(logIn(data.token));
			setStatus(Status.Done);
			navigate(Routes.Home);
		} else {
			setStatus(Status.Error);
			alert(message);
		}
	};

	return (
		<Container
			className={`d-flex justify-content-center align-items-center ${loginPageStyles.container}`}
		>
			{status === Status.Pending ? (
				<Loading />
			) : (
				<Row className="justify-content-center">
					<Col>
						<Form
							onSubmit={async (e) => {
								e.preventDefault();
								await onFormSubmit();
							}}
							className="d-flex flex-column"
						>
							<div
								className={`${loginPageStyles.row} mb-4 border-bottom border-warning`}
							>
								<h2>Welcome to Book's List!</h2>
							</div>
							<FormGroup>
								<Label for="username" hidden>
									Email
								</Label>
								<Input
									id="username"
									name="username"
									placeholder="Username"
									type="text"
									value={username}
									onChange={(event) => {
										setUsername(event.target.value);
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password" hidden>
									Password
								</Label>
								<Input
									id="password"
									name="password"
									placeholder="Password"
									type="password"
									value={password}
									onChange={(event) => {
										setPassword(event.target.value);
									}}
								/>
							</FormGroup>
							<Button color="warning">Login</Button>
						</Form>
					</Col>
				</Row>
			)}
		</Container>
	);
}
