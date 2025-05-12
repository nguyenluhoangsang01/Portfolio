import React from "react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";

type Props = {
	children: React.ReactNode;
};

function DefaultLayout({ children }: Props) {
	return (
		<>
			<Navbar />
			<div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
				<main>{children}</main>
			</div>
			<Footer />
		</>
	);
}

export default DefaultLayout;
