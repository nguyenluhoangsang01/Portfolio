import { useState } from "react";
import api from "~/api";
import DefaultLayout from "~/components/DefaultLayout";
import RichTextEditor from "~/components/RichTextEditor";
import TagInput from "~/components/TagInput";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | Create post" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

const Admin = () => {
	const [title, setTitle] = useState("");
	const [tag, setTag] = useState<string[]>([]);
	const [category, setCategory] = useState<string[]>([]);
	const [content, setContent] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		try {
			e.preventDefault();
			api.post("/post", {
				title,
				content,
				tag,
				category,
			});

			setMessage("✅ Post created successfully!");

			// Reset form fields after submission
			setTitle("");
			setTag([]);
			setCategory([]);
			setContent("");

			scrollTo(0, 0); // Scroll to top of the page

			// ✅ Hide alert after 3 seconds
			setTimeout(() => setMessage(""), 3000);
		} catch (err) {
			console.error(err);
			setMessage("❌ Failed to create post.");
			setTimeout(() => setMessage(""), 3000);
		}
	};

	return (
		<DefaultLayout>
			<form
				onSubmit={handleSubmit}
				className="space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-6xl mx-auto"
			>
				{message && (
					<div className="p-2 rounded text-sm font-medium text-white bg-green-600">
						{message}
					</div>
				)}

				<h2 className="text-2xl font-bold">Create new post</h2>

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
		</DefaultLayout>
	);
};

export default Admin;
