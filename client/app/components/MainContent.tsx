import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Loading from "~/components/Loading";
import Pagination from "~/components/Pagination";
import { formatDate } from "~/utils/formatDate";
import api from "../api";

type Post = {
	_id: string;
	title: string;
	content: string;
	tag: string[];
	category: string;
	createdAt: string;
	updatedAt: string;
};

function MainContent() {
	const [data, setData] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const recentPostsRef = useRef<HTMLHeadingElement | null>(null);

	const POSTS_PER_PAGE = 5;
	const paginatedData = data.slice(3); // remove first 3 "Quick links"
	const start = (currentPage - 1) * POSTS_PER_PAGE;
	const end = start + POSTS_PER_PAGE;
	const visiblePosts = paginatedData.slice(start, end);
	const totalPages = Math.ceil((data.length - 3) / POSTS_PER_PAGE);

	useEffect(() => {
		api
			.get("/post")
			.then(({ data }) => {
				setData(data.data.posts.reverse());
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching posts:", error);
				setLoading(false);
			});
		// Cleanup function to avoid memory leaks
		return () => {
			setData([]);
			setLoading(true);
		};
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);

		recentPostsRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px] format">
			<h1 className="page-title text-2xl mb-8">👋 Welcome to the site!</h1>
			<div className="mb-16">
				<b className="text-[20px] border-b-2 border-[#51555d]">
					Quick links to popular content can be found below:
				</b>
				<ul className="list-disc list-inside mt-8 ml-8">
					{data && !loading ? (
						data.slice(0, 3).map((post) => (
							<li key={post._id} className="text-[18px] mb-2">
								<Link
									to={`/post/${post._id}`}
									className="text-[#699da0] underline hover:text-[#4a7b8c]"
								>
									{post.title}
								</Link>
							</li>
						))
					) : (
						<Loading lines={3} />
					)}
				</ul>
			</div>
			<div>
				<h2
					className="text-[20px] border-b-2 border-[#51555d] font-bold"
					ref={recentPostsRef}
				>
					Recent posts:
				</h2>
				<ul className="list-disc list-inside mt-8 ml-8 flex flex-col gap-4">
					{visiblePosts && !loading ? (
						visiblePosts.map((post) => (
							<li key={post._id} className="text-[18px] mb-2">
								<Link to={`/post/${post._id}`} className="flex flex-col gap-2">
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
						<Loading lines={3} />
					)}
				</ul>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

export default MainContent;
