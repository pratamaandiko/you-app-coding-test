import React from "react";

const Select = ({ options, onChange, value }) => {
	return (
		<select
			id="countries"
			className="bg-[#ffffff0f] border border-white border-opacity-20 rounded-lg text-sm md:text-base block w-full p-2.5 text-gray-400"
			onChange={onChange}
			value={value ?? ""}
		>
			{options.map((item) => (
				<option key={item.value} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
};

export default Select;
