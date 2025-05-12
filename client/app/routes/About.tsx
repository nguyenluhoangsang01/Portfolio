import { Link } from "react-router";
import Sidebar from "~/components/Sidebar";
import aboutImage from "~/welcome/about-image.png";
import DefaultLayout from "../components/DefaultLayout";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | About" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

export default function About() {
	return (
		<DefaultLayout>
			<div className="flex">
				<Sidebar />
				<div className="mt-[22px] w-3/4 ml-[50px] mb-[50px] pr-[200px]">
					<div className="flex justify-center mb-4">
						<img
							src={aboutImage}
							alt="aboutImage"
							className="w-[477px] h-[477px]"
						/>
					</div>
					<p className="mb-[20px]">
						I am a passionate person and I am quite private. I just graduated in
						April 2025 and I have a CCNA certification, studied through CEHv12.
						My abilities are focused on pentest tools. I like reverse
						engineering, pentesting. I will always try to learn as much as
						possible around every aspect of Information Security. Thanks
						everyone 😸
					</p>
					<p className="mb-[20px]">
						I hope my contributions can help everyone improve their knowledge
						about every aspect of offensive security. I will focus mainly on
						offensive security tools. Finally, I also want to share detailed
						tutorials, analysis of tools and concepts shared in all posts. I
						think everything will come in time 😸
					</p>
					<p className="mb-[20px]">
						You can find me on Telegram:{" "}
						<Link
							to="https://t.me/lMAMMONl"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="ml-1.5 underline">lMAMMONl</span>
						</Link>
					</p>
				</div>
			</div>
		</DefaultLayout>
	);
}
