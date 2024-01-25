import React from "react";

const DangerAlert = ({ children }) => {
	return (
		<div className="relative bg-red-500 text-white py-3 px-6 rounded mb-4">
			{children}
		</div>
	);
};

export default DangerAlert;
