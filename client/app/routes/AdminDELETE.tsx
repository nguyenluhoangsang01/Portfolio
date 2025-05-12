import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "~/api";
import DefaultLayout from "~/components/DefaultLayout";

const AdminDELETE = () => {
	const { id } = useParams();
	const [message, setMessage] = useState("");

	useEffect(() => {
		api
			.delete(`post/${id}`)
			.then((res) => setMessage("✅ Post deleted successfully!"));
	}, []);

	return (
		<DefaultLayout>
			<div className="mt-[22px] mb-[50px] text-center text-[40px]">
				{message}
			</div>
		</DefaultLayout>
	);
};

export default AdminDELETE;
