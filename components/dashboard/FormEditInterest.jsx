import React from "react";
import TagsInput from "../general/TagsInput";
import { Controller } from "react-hook-form";

const FormEditInterest = ({ onClick, control, handleSubmit }) => {
	return (
		<section className="flex flex-col justify-between space-y-10 w-full bg-gray-900 rounded-2xl p-6 ">
			<form onSubmit={handleSubmit(onClick)}>
				<div className="flex justify-between items-center">
					<h2 className="font-bold">About</h2>
					<button
						className="text-right text-cyan-200 text-sm md:text-base font-semibold"
						type="submit"
					>
						Save
					</button>
				</div>
				<div className="mb-6 w-[350px] mx-auto space-y-3">
					<h2 className="text-gradient-gold font-bold">
						Tell everyone about yourself
					</h2>
					<h1 className="text-white text-xl font-bold">What interest you?</h1>
					<Controller
						name={`interests`}
						control={control}
						defaultValue={[]}
						render={({ field: { onChange, value } }) => (
							<TagsInput
								placeholder="Input interest"
								onChange={onChange}
								value={value}
							/>
						)}
					/>
				</div>
			</form>
		</section>
	);
};

export default FormEditInterest;
