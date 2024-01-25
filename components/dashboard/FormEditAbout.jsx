import React from "react";
import Input from "../general/Input";
import Select from "../general/Select";
import ImageUpload from "../general/ImageUpload";
import { Controller } from "react-hook-form";

const CustomForm = ({ children, id, label }) => {
	return (
		<div className="grid grid-cols-3 gap-3 items-center">
			<label
				htmlFor={id}
				className="col-span-1 text-white text-sm md:text-base text-opacity-30 "
			>
				{label}:
			</label>
			<div className="col-span-2">{children}</div>
		</div>
	);
};

const FormEditAbout = ({ onClick, control, handleSubmit }) => {
	return (
		<section className="flex flex-col justify-between space-y-10 w-full bg-gray-900 rounded-2xl p-6">
			<form onSubmit={handleSubmit(onClick)}>
				<div className="flex justify-between items-center">
					<h2 className="font-bold">About</h2>
					<button className="text-gradient-gold font-semibold">
						Save & Update
					</button>
				</div>

				<div className="mb-6 space-y-5">
					<Controller
						name={`image`}
						control={control}
						defaultValue={""}
						render={({ field: { onChange, value } }) => (
							<ImageUpload onChange={onChange} value={value} />
						)}
					/>

					<CustomForm label="Display name" id={"username"}>
						<Controller
							name={`username`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="text"
									id="username"
									placeholder="Enter name"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Gender" id={"gender"}>
						<Controller
							name={`gender`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Select
									options={[
										{ label: "Male", value: "male" },
										{ label: "Female", value: "female" },
									]}
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Birthday" id={"birthday"}>
						<Controller
							name={`birthday`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="date"
									id="birthday"
									placeholder="DD MM YYYY"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Horoscope" id={"horoscope"}>
						<Controller
							name={`horoscope`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="text"
									id="horoscope"
									placeholder="Enter horoscope"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Zodiac" id={"zodiac"}>
						<Controller
							name={`zodiac`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="text"
									id="zodiac"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Height" id={"height"}>
						<Controller
							name={`height`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="number"
									id="height"
									placeholder="Enter height"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
					<CustomForm label="Weight" id={"weight"}>
						<Controller
							name={`weight`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="number"
									id="weight"
									placeholder="Enter weight"
									onChange={onChange}
									value={value}
								/>
							)}
						/>
					</CustomForm>
				</div>
			</form>
		</section>
	);
};

export default FormEditAbout;
