import { useFocus } from "../Pages/Dashboard";
import "./ViewNoteModal.scss";

export default function ViewNoteModal({ data }: any) {
	// const { data } = useFocus();
	return (
		<div className="view-note" id={data.id}>
			<h1>VIEW NOTE</h1>
			<h1>{data.name}</h1>
			<div dangerouslySetInnerHTML={{ __html: data.content }} />
			<p>Created: {data.createdDate}</p>
			<p>Last Updated: {data.updatedDate}</p>
		</div>
	);
}
