import { link } from "fs";
import React from "react";
import Layout from "../Layout/Layout";
import { gradientBgUp, gradientText } from "../Styles/CustomStyles";

const linkClasses =
	"hover:underline underline-offset-2 text-secondary-blue  cursor-pointer";
const InnerFooter = () => {
	return (
		<footer className={`bg-slate-200 dark:bg-slate-800`}>
			<Layout>
				<div className="flex flex-col gap-10">
					<p className="text-primary-gray border-b md:w-1/2 border-primary-gray pb-2 text-h3">
						Important links
					</p>

					<ul className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-5">
						<li className={linkClasses}>Dashboard</li>
						<li className={linkClasses}>Market place</li>
						<li className={linkClasses}>Leaderboard</li>
						<li className={linkClasses}>Report bug</li>
						<a
							href="https://www.markdownguide.org/basic-syntax/"
							target="_blank"
							rel="noreferrer"
						>
							<li className={linkClasses}>Learn markdown</li>
						</a>
						<li className={linkClasses}>Contact us</li>
					</ul>
					<div className="flex flex-col md:flex-row md:justify-between gap-5">
						<h1
							className={`${gradientText} font-headFamily text-h2 font-semibold `}
						>
							REAL LIFE MMORPG
						</h1>
						<p className=" text-primary-gray">@ Daniel Bílek 2022</p>
					</div>
				</div>
			</Layout>
		</footer>
	);
};

export default InnerFooter;
