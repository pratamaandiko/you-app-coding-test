import React from "react";

const Badge = ({ children }) => {
	return (
		<div className="flex items-center bg-white bg-opacity-10 rounded px-2 py-1 w-max">
			{children}
		</div>
	);
};

export default Badge;
