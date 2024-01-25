import Image from "next/image";
import React, { useState } from "react";

const ImageUpload = ({ onChange, value }) => {
	const [selectedImage, setSelectedImage] = useState(value);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedImage(reader.result);
				onChange(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="flex justify-start items-center gap-1">
			{selectedImage ? (
				<div className="w-14 h-14 overflow-hidden rounded-lg">
					<Image
						src={selectedImage}
						alt="profile"
						className="w-14 h-14 object-cover"
						height={14}
						width={14}
					/>
				</div>
			) : (
				<div className="flex justify-center items-center cursor-pointer bg-white bg-opacity-10 py-2 px-4 w-14 h-14 rounded-lg">
					<span className="text-2xl leading-none text-gradient-gold">+</span>
				</div>
			)}

			<input
				type="file"
				accept="image/*"
				className="hidden"
				id="imageInput"
				onChange={handleImageChange}
			/>
			<label
				htmlFor="imageInput"
				className="cursor-pointer text-white py-2 px-4 border border-white border-opacity-20 rounded-lg text-sm md:text-base"
			>
				Add image
			</label>
		</div>
	);
};

export default ImageUpload;
