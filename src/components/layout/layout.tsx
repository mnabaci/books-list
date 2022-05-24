import layoutStyles from "./layout.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
	Col,
	Collapse,
	Container,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarText,
	NavbarToggler,
	NavItem,
	NavLink,
	Row,
	UncontrolledDropdown,
} from "reactstrap";
import { useAppDispatch } from "../../app/hooks";
import styles from "../../common/styles/styles.module.css";
import { isLoggedIn, logOut } from "../../features/auth/authSlice";
import { Routes } from "../../common/constants/routes";
import { useState } from "react";

export default function Layout({ children }: { children: JSX.Element }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const dispatch = useAppDispatch();
	let navigate = useNavigate();
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
										<NavLink tag={Link} to={Routes.Home}>
											Home
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink tag={Link} to={Routes.Illustrations}>
											Illustrations
										</NavLink>
									</NavItem>
								</Nav>
								<NavbarText className={layoutStyles.logOut} onClick={onLogOut}>
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
											Github
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
