import { Welcome } from "../welcome/welcome";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Mammon's Blog | Home" },
		{
			name: "description",
			content:
				"Security Researcher and Enthusiast. I’m fairly low profile, but share useful info from time to time. Red Team wannabe",
		},
	];
}

export default function Home() {
	return <Welcome />;
}
