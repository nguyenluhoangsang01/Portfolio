import React from "react";
import { Link } from "react-router";

function Footer() {
	return (
		<div className="h-[155.09px] bg-[#1a1d24] text-white text-medium format">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
				<ul className="social-icons flex items-center gap-4 mt-4 h-[44px] text-[16.5px]">
					{socialMedia.map((item) => (
						<li key={item.name} className="social-icon-item font-bold">
							<Link to={item.url} target="_blank" rel="noopener noreferrer">
								{item.icon}{" "}
								<span className="ml-1.5 hover:underline">{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
				<div className="footer-copyright text-[14px] mt-4">
					© 2025 (mammon). Powered by Mammon
				</div>
			</div>
		</div>
	);
}

export default Footer;

const socialMedia = [
	{
		name: "Facebook",
		icon: <i className="fab fa-facebook-square"></i>,
		url: "https://www.facebook.com/trunghieu8401/",
	},
	{
		name: "GitHub",
		icon: <i className="fab fa-github"></i>,
		url: "https://github.com/2Mammon2",
	},
	{
		name: "Telegram",
		icon: <i className="fab fa-telegram"></i>,
		url: "https://t.me/lMAMMONl",
	},
];
