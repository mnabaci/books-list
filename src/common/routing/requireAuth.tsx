import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { isLoggedIn } from "../../features/auth/authSlice";
import { Routes } from "../constants/routes";

export default function RequireAuth({ children }: { children: JSX.Element }) {
	const dispatch = useAppDispatch();
	const loggedIn = dispatch(isLoggedIn());
	let location = useLocation();

	if (!loggedIn) {
		return (
			<Navigate to={Routes.Login} state={{ from: location.pathname }} replace />
		);
	}

	return children;
}
