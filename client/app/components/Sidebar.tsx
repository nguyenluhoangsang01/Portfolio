import { Link } from "react-router";
import logo from "~/welcome/logo.svg";

function Sidebar() {
	return (
		<div className="min-h-screen flex w-1/4 format">
			<div className="mt-[22px] sticky top-6 self-start h-fit">
				<div className="w-fit">
					<div className="author__avatar">
						<img src={logo} alt="Logo" className="h-25" />
					</div>
					<div className="author-name mt-[10px]">
						<h3 className="text-[22px] text-[#eaeaea]">R.B.C (g3tsyst3m)</h3>
					</div>
					<div className="author-description mt-[10px] mb-[20px]">
						<h3 className="text-[16.5px] mt-[10px] text-[#eaeaea]">
							Super passionate about Infosec…Dwight Schrute level of intensity
						</h3>
					</div>
					<ul className="social-icons flex flex-col gap-2 text-[16.5px]">
						{socialMedia.map((item) => (
							<li key={item.name} className="social-icon-item">
								<Link to={item.url} target="_blank" rel="noopener noreferrer">
									{item.icon}{" "}
									<span className="ml-1.5 hover:underline">{item.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;

const socialMedia = [
	{
		name: "Email",
		icon: <i className="fa-solid fa-inbox"></i>,
		url: "mailto:nguyentrunghieu842001@gmail.com",
	},
	{
		name: "Website",
		icon: <i className="fa-solid fa-link"></i>,
		url: "https://mammon.github.io/",
	},
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
