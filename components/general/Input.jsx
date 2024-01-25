import React from "react";

const Input = (props) => {
	return (
		<input
			{...props}
			className="bg-[#ffffff0f] border border-white border-opacity-20 rounded-[9px] text-sm md:text-base block w-full p-2.5 "
		/>
	);
};

export default Input;
