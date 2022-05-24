import { useState } from "react";
import { useAppDispatch } from "./app/hooks";
import AppRoutes from "./common/routing/router";
import { loadAuthToken } from "./features/auth/authSlice";

function App() {
	const [isAppLoaded, setIsAppLoaded] = useState(false);
	const dispatch = useAppDispatch();

	if (!isAppLoaded) {
		dispatch(loadAuthToken());

		setIsAppLoaded(true);

		return <></>;
	} else return <AppRoutes />;
}

export default App;
