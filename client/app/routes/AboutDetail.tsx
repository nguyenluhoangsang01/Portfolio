import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "~/api";
import DefaultLayout from "~/components/DefaultLayout";
import Sidebar from "~/components/Sidebar";
import { formatDate } from "~/utils/formatDate";
import type { Route } from "./+types/home";

type Post = {
	_id: string;
	title: string;
	content: string;
	tag: string[];
	category: string[];
	createdAt: string;
	updatedAt: string;
};

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | Post" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

const AboutDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [data, setData] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api
			.get(`/post/${id}`)
			.then(({ data }) => {
				setData(data.data.post);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setLoading(false);
			});
		// Cleanup function to avoid memory leaks
		return () => {
			setData(null);
			setLoading(true);
		};
	}, [id, setData, setLoading]);

	if (!data)
		return (
			<DefaultLayout>
				<div className="flex">
					<Sidebar />
					<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]">
						<h1 className="page-title text-[26px] font-bold">Loading...</h1>
					</div>
				</div>
			</DefaultLayout>
		);

	return (
		<DefaultLayout>
			<div className="flex">
				<Sidebar />
				{!loading && (
					<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]">
						<h1 className="page-title text-[26px] font-bold">{data.title}</h1>
						<p className="text-[14px] mb-4 flex items-center gap-2">
							<i className="fa-solid fa-calendar-days"></i>
							<span>{formatDate(data.createdAt)}</span>
						</p>
						<div
							className="prose dark:prose-invert max-w-none flex flex-col gap-3"
							dangerouslySetInnerHTML={{
								__html: data.content,
							}}
						/>
						<div className="space-y-2 text-sm text-white mt-16">
							<div className="flex items-start gap-2">
								<i className="fa-solid fa-tags"></i>
								<span className="flex items-center gap-1 font-semibold">
									Tags:
								</span>
								<div className="flex flex-wrap gap-2">
									{data.tag.map((t, i) => (
										<Link
											key={i}
											to={`/tags/#${t.replaceAll(" ", "-")}`}
											className="px-2 py-0.5 border border-white rounded hover:bg-white hover:text-black transition"
										>
											{t}
										</Link>
									))}
								</div>
							</div>

							<div className="flex items-start gap-2">
								<i className="fa-solid fa-folder-open"></i>
								<span className="flex items-center gap-1 font-semibold">
									Categories:
								</span>
								<div className="flex flex-wrap gap-2">
									{data.category.map((c, i) => (
										<Link
											key={i}
											to={`/categories/#${c.replaceAll("%20", "-")}`}
											className="px-2 py-0.5 border border-white rounded hover:bg-white hover:text-black transition"
										>
											{c}
										</Link>
									))}
								</div>
							</div>

							<div className="flex items-center gap-2">
								<i className="fa-solid fa-calendar-days"></i>
								<span className="font-semibold">Updated:</span>
								<span>
									{new Date(data.updatedAt).toLocaleDateString("en-US", {
										dateStyle: "long",
									})}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default AboutDetail;
