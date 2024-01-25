import React, { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import Badge from "./Badge";

const TagsInput = ({ placeholder, value, onChange }) => {
	const [tags, setTags] = useState(value);
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyPress = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			e.preventDefault();
			setTags([...tags, inputValue.trim()]);
			onChange([...tags, inputValue.trim()]);
			setInputValue("");
		}
	};

	const handleTagRemove = (index) => {
		const updatedTags = [...tags];
		updatedTags.splice(index, 1);
		setTags(updatedTags);
		onChange(updatedTags);
	};

	return (
		<div className="flex flex-col justify-center gap-4 items-start max-w-[500px] bg-zinc-300 bg-opacity-5 rounded-lg p-5">
			<div className="flex flex-wrap gap-2">
				{tags.map((tag, index) => (
					<Badge key={index}>
						{tag}
						<button
							className="ml-2 font-bold"
							onClick={() => handleTagRemove(index)}
						>
							<CloseIcon />
						</button>
					</Badge>
				))}
			</div>
			<input
				type="text"
				className="border rounded p-2 bg-transparent w-full"
				placeholder={placeholder}
				value={inputValue}
				onChange={handleInputChange}
				onKeyPress={handleInputKeyPress}
			/>
		</div>
	);
};

export default TagsInput;
