import layoutStyles from "./layout.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	Col,
	Collapse,
	Container,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarText,
	NavbarToggler,
	NavItem,
	NavLink,
	Row,
} from "reactstrap";
import { useAppDispatch } from "../../app/hooks";
import { isLoggedIn, logOut } from "../../features/auth/authSlice";
import { Routes } from "../../common/constants/routes";
import { useState } from "react";
import styles from "../../common/styles/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faRightFromBracket,
	faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }: { children: JSX.Element }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	let navigate = useNavigate();
	let location = useLocation();

	const dispatch = useAppDispatch();
	const loggedIn = dispatch(isLoggedIn());

	const onLogOut = () => {
		dispatch(logOut());
		navigate(Routes.Login);
	};

	return (
		<div className={`${styles.container} ${layoutStyles.wrapper}`}>
			<header>
				<Navbar color="dark" dark expand="md">
					<NavbarBrand>Book's List</NavbarBrand>
					{loggedIn && (
						<>
							<NavbarToggler onClick={() => setIsMenuOpen(!isMenuOpen)} />
							<Collapse isOpen={isMenuOpen} navbar>
								<Nav className="me-auto" navbar>
									<NavItem>
										<NavLink
											active={location.pathname === Routes.Home}
											tag={Link}
											to={Routes.Home}
										>
											Home
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											active={location.pathname === Routes.Illustrations}
											tag={Link}
											to={Routes.Illustrations}
										>
											Illustrations
										</NavLink>
									</NavItem>
								</Nav>
								<NavbarText
									className={`${layoutStyles.logOut}`}
									onClick={onLogOut}
								>
									<FontAwesomeIcon icon={faRightFromBracket} className="me-1" />
									Log out
								</NavbarText>
							</Collapse>
						</>
					)}
				</Navbar>
			</header>
			<main className={`${layoutStyles.body}`}>{children}</main>
			<footer>
				<Navbar color="dark" dark expand="md" fixed="bottom">
					<Nav className="flex-grow-1" navbar>
						<Container className="text-light">
							<Row className="text-center align-items-center">
								<Col md={6} className="my-1 py-0 px-2">
									<NavItem>
										<NavLink tag={Link} className="p-0" to={Routes.Home}>
											Home
										</NavLink>
									</NavItem>
								</Col>
								<Col md={6} className={`my-1 py-0 px-2`}>
									<NavItem>
										<NavLink
											className="p-0"
											target={"_blank"}
											href="https://github.com/mnabaci"
										>
											<FontAwesomeIcon size="xs" icon={faUpRightFromSquare} />{" "}
											GitHub
										</NavLink>
									</NavItem>
								</Col>
								<Col md={12} className="justify-content-center">
									<div className={layoutStyles.line} />
								</Col>
								<Col md={12} className="justify-content-center my-1">
									<NavbarText>Mehmet Abaci © 2022</NavbarText>
								</Col>
							</Row>
						</Container>
					</Nav>
				</Navbar>
			</footer>
		</div>
	);
}
