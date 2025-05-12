import { Link } from "react-router";
import logo from "~/welcome/logo.svg";

function Navbar() {
	return (
		<nav className="h-[88.8px] border-b-2 border-b-[#51555d]">
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
				<div className="flex items-center">
					<Link to="/" className="flex items-center">
						<img src={logo} alt="Logo" className="h-10" />
					</Link>
					<Link to="/" className="text-[20px] font-bold ml-2">
						<span className="text-[20px] font-bold">Mammon's Blog</span>
					</Link>
				</div>
				<Link to="/about" className="text-[22px] hover:underline">
					About
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
