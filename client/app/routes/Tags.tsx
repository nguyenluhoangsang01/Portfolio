import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import api from "~/api";
import DefaultLayout from "~/components/DefaultLayout";
import Loading from "~/components/Loading";
import Sidebar from "~/components/Sidebar";
import { formatDate } from "~/utils/formatDate";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | Tags" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

type Post = {
	_id: string;
	title: string;
	content: string;
	tag: string[];
	category: string[];
	createdAt: string;
	updatedAt: string;
};

const Tags = () => {
	const { hash } = useLocation();
	const [tag, setTag] = useState("");
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const titleRef = useRef<HTMLHeadingElement | null>(null);

	// Normalize hash and update tag
	useEffect(() => {
		const normalizedTag = hash.slice(1).toLowerCase().replace(/\s+/g, "-");
		setTag(normalizedTag);
	}, [hash]);

	useEffect(() => {
		api
			.get("/post")
			.then(({ data }) => {
				setPosts(data.data.posts.reverse());
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setLoading(false);
			});
		// Cleanup function to avoid memory leaks
		return () => {
			setPosts([]);
			setLoading(true);
		};
	}, []);

	const countedTags = useMemo(() => {
		const allTags = posts
			.flatMap(({ tag }) => tag)
			.map((t) => t.toLowerCase().replace(/\s+/g, "-"));

		const tagCount: Record<string, number> = {};
		for (const tag of allTags) {
			tagCount[tag] = (tagCount[tag] || 0) + 1;
		}

		return Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
	}, [posts]);

	const filteredPosts = useMemo(() => {
		if (!tag || posts.length === 0) return [];
		return posts.filter((post) =>
			post.tag?.map((t) => t.toLowerCase().replace(/\s+/g, "-")).includes(tag)
		);
	}, [tag, posts]);

	const handleClick = (tag: string) => {
		const el = document.getElementById(tag);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<DefaultLayout>
			<div className="flex">
				<Sidebar />
				{!loading ? (
					<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px]">
						<h2 className="page-title text-[26px] font-bold mb-[30px] underline">
							Tags
						</h2>
						<ul className="space-y-2 grid grid-cols-3 gap-x-[50px] gap-y-[10px] !list-none ml-[-48px]">
							{countedTags.map(([tag, count]) => (
								<li key={tag} className="pb-1" onClick={() => handleClick(tag)}>
									<Link
										to={`/tags/#${tag}`}
										className="flex justify-between border-b-[1px] border-[#51555d]"
									>
										<span className="font-bold">{tag}</span>
										<span className="font-bold">{count}</span>
									</Link>
								</li>
							))}
						</ul>

						{loading ? (
							<Loading lines={3} />
						) : (
							<>
								<h2
									id={tag}
									ref={titleRef}
									className="page-title text-[26px] font-bold mb-[30px] mt-[80px] underline"
								>
									{tag.toUpperCase()}
								</h2>
								<ul className="mt-8 flex flex-col gap-4 !list-none !pl-[32px]">
									{filteredPosts.length > 0 ? (
										filteredPosts.map((post) => (
											<li key={post._id} className="text-[18px] mb-2">
												<Link
													to={`/post/${post._id}`}
													className="flex flex-col gap-2"
												>
													<h2 className="text-[#699da0] underline hover:text-[#4a7b8c] text-[26px] font-bold">
														{post.title}
													</h2>

													<div className="text-[13px] flex items-center gap-1 opacity-70">
														<i className="fa-solid fa-calendar-days"></i>
														<span>{formatDate(post.createdAt)}</span>
													</div>

													<div
														className="line-clamp-2 text-[16px]"
														dangerouslySetInnerHTML={{ __html: post.content }}
													/>
												</Link>
											</li>
										))
									) : (
										<p>No posts found for this tag.</p>
									)}
								</ul>
							</>
						)}
					</div>
				) : (
					<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] flex flex-col gap-2 pr-[200px]">
						<h1 className="page-title text-[26px] font-bold">Loading...</h1>
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Tags;
