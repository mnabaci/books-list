import { Alert as BAlert } from "reactstrap";
import alertStyles from "./alert.module.css";

export default function Alert({ message, isOpen, toggle }: Props) {
	return (
		<div className={`${alertStyles.container}`}>
			<BAlert color="danger" fade isOpen={isOpen} toggle={toggle}>
				{message}
			</BAlert>
		</div>
	);
}

interface Props {
	message: string;
	isOpen: boolean;
	toggle: () => void;
}
