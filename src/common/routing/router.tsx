import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Layout from "../../components/layout/layout";
import HomePage from "../../pages/home/homePage";
import LoginPage from "../../pages/login/loginPage";
import RequireAuth from "./requireAuth";
import { Routes as RoutesEnum } from "../constants/routes";
import NotFoundPage from "../../pages/notFound/notFoundPage";
import IllustrationsPage from "../../pages/illustrations/illustrationsPage";

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route
					path={RoutesEnum.Home}
					element={
						<RequireAuth>
							<Layout>
								<HomePage />
							</Layout>
						</RequireAuth>
					}
				/>
				<Route
					path={RoutesEnum.Illustrations}
					element={
						<RequireAuth>
							<Layout>
								<IllustrationsPage />
							</Layout>
						</RequireAuth>
					}
				/>
				<Route
					path={RoutesEnum.Login}
					element={
						<Layout>
							<LoginPage />
						</Layout>
					}
				/>
				<Route
					path={RoutesEnum.Any}
					element={<Navigate to={RoutesEnum.NotFound} replace />}
				/>
				<Route
					path={RoutesEnum.NotFound}
					element={
						<Layout>
							<NotFoundPage />
						</Layout>
					}
				/>
			</Routes>
		</Router>
	);
}
