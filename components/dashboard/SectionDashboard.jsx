import React from "react";
import EditIcon from "../icons/EditIcon";

const SectionDashboard = ({ title, children, onClick }) => {
	return (
		<section className="flex flex-col justify-between space-y-10 w-full bg-gray-900 rounded-2xl p-6">
			<div className="flex justify-between items-center">
				<h2 className="font-bold">{title}</h2>
				<button onClick={onClick}>
					<EditIcon />
				</button>
			</div>
			{children}
		</section>
	);
};

export default SectionDashboard;
