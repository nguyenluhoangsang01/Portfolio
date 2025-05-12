import DefaultLayout from "~/components/DefaultLayout";
import MainContent from "~/components/MainContent";
import Sidebar from "~/components/Sidebar";

export function Welcome() {
	return (
		<DefaultLayout>
			<div className="flex">
				<Sidebar />
				<MainContent />
			</div>
		</DefaultLayout>
	);
}