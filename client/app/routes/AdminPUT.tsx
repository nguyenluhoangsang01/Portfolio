import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "~/api";
import DefaultLayout from "~/components/DefaultLayout";
import RichTextEditor from "~/components/RichTextEditor";
import TagInput from "~/components/TagInput";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | Update post" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

const AdminPUT = () => {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tag, setTag] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<{
		text: string;
		isError: boolean;
	} | null>(null);

	useEffect(() => {
		api
			.get(`/post/${id}`)
			.then(({ data }) => {
				setTitle(data.data.post.title);
				setContent(data.data.post.content);
				setTag(data.data.post.tag);
				setCategory(data.data.post.category);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await api.patch(`/post/${id}`, {
				title,
				content,
				tag,
				category,
			});

			console.log({ title, content, tag, category });

			setMessage({ text: "✅ Post updated successfully!", isError: false });
			scrollTo(0, 0); // Scroll to top of the page
			setTimeout(() => setMessage(null), 3000);
		} catch (err) {
			console.error(err);
			setMessage({ text: "❌ Failed to update post.", isError: true });
			setTimeout(() => setMessage(null), 3000);
		}
	};

	return (
		<DefaultLayout>
			{!loading ? (
				<form
					onSubmit={handleSubmit}
					className="space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-6xl mx-auto"
				>
					{message && (
						<div
							className={`p-2 rounded text-sm font-medium text-white ${
								message.isError ? "bg-red-600" : "bg-green-600"
							}`}
						>
							{message.text}
						</div>
					)}

					<h2 className="text-2xl font-bold">Update post - ID: {id}</h2>

					<div>
						<label className="block mb-1 font-semibold">Title</label>
						<input
							name="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-4 py-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Post title"
							required
						/>
					</div>

					<div className="flex gap-10">
						<TagInput label="Tag" tag={tag} setTag={setTag} />
						<TagInput label="Category" tag={category} setTag={setCategory} />
					</div>

					<RichTextEditor content={content} setContent={setContent} />

					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
					>
						Submit
					</button>
				</form>
			) : (
				<h1 className="page-title text-[26px] font-bold">Loading...</h1>
			)}
		</DefaultLayout>
	);
};

export default AdminPUT;
