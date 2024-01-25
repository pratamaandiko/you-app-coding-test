import React from "react";

const Button = (props) => {
	return (
		<button
			{...props}
			type={props.type || "button"}
			className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  focus:outline-none shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
		>
			{props.text}
		</button>
	);
};

export default Button;
