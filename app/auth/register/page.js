"use client";
import Button from "@/components/general/Button";
import DangerAlert from "@/components/general/DangerAlert";
import FormErrorMessage from "@/components/general/FormErrorMessage";
import Input from "@/components/general/Input";
import PasswordInput from "@/components/general/PasswordInput";
import { useRegister } from "@/hooks/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Register = () => {
	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const { mutate, isLoading } = useRegister();
	const [errMessage, setErrMessage] = useState(null);
	const onSubmit = (data) => {
		mutate(
			{
				data: {
					email: data.email,
					username: data.username,
					password: data.password,
				},
			},
			{
				onSuccess: () => {
					router.replace("/auth/login");
				},
				onError: (err) => {
					console.error(err);
					setErrMessage(err.response.data.message[0]);
				},
			}
		);
	};
	return (
		<main className="flex justify-center items-center h-[100vh]">
			<div className="flex flex-col p-5 w-[331px]">
				<h1 className="font-bold text-[24px] mb-6">Register</h1>
				{errMessage && <DangerAlert>{errMessage}</DangerAlert>}

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col space-y-4 mb-6">
						<Controller
							name={`email`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="email"
									id="email"
									placeholder="Enter Username/Email"
									required
									onChange={onChange}
									value={value}
								/>
							)}
							rules={{ required: "Email is required" }}
						/>{" "}
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
						<Controller
							name={`username`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<Input
									type="text"
									id="username"
									placeholder="Create Username"
									required
									onChange={onChange}
									value={value}
								/>
							)}
							rules={{ required: "Username is required" }}
						/>{" "}
						<FormErrorMessage>
							{errors.username && errors.username.message}
						</FormErrorMessage>
						<Controller
							name={`password`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<PasswordInput
									placeholder="Create Password"
									onChange={onChange}
									value={value}
								/>
							)}
							rules={{
								required: "Password is required",
								minLength: {
									value: 8,
									message:
										"password must be longer than or equal to 8 characters",
								},
							}}
						/>{" "}
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
						<Controller
							name={`confirmPassword`}
							control={control}
							defaultValue={""}
							render={({ field: { onChange, value } }) => (
								<PasswordInput
									placeholder="Confirm Password"
									onChange={onChange}
									value={value}
								/>
							)}
							rules={{
								required: "Confirm password is required",
								validate: (val) => {
									if (watch("password") != val) {
										return "Your passwords do no match";
									}
								},
							}}
						/>
						<FormErrorMessage>
							{errors.confirmPassword && errors.confirmPassword.message}
						</FormErrorMessage>
					</div>
					<Button text={isLoading ? "Loading..." : "Register"} type="submit" />
				</form>
				<p className="text-center my-6">
					Have an account?{" "}
					<Link
						href={"/auth/login"}
						className="text-gradient-gold font-medium font-['Inter'] underline"
					>
						Login here
					</Link>
				</p>
			</div>
		</main>
	);
};

export default Register;
