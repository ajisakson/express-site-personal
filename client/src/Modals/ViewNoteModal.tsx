import { useFocus } from "../Pages/Dashboard";
import "./ViewNoteModal.scss";

export default function ViewNoteModal() {
	const { data } = useFocus();
	return (
		<div className="view-note" id={data.id}>
			<h1>VIEW NOTE</h1>
		</div>
	);
}
