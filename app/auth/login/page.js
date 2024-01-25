"use client";
import Button from "@/components/general/Button";
import DangerAlert from "@/components/general/DangerAlert";
import FormErrorMessage from "@/components/general/FormErrorMessage";
import Input from "@/components/general/Input";
import PasswordInput from "@/components/general/PasswordInput";
import { useLogin } from "@/hooks/api/auth";
import useAuthStore from "@/hooks/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const Login = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();
	const login = useAuthStore((state) => state.login);
	const router = useRouter();
	const { mutate, isLoading } = useLogin();
	const [errMessage, setErrMessage] = useState(null);
	const onSubmit = (data) => {
		mutate(
			{
				data,
			},
			{
				onSuccess: (res) => {
					if (res.message) {
						setErrMessage(res.message);
					} else {
						login({
							userData: { access_token: res.access_token },
						});
						router.replace("/dashboard");
					}
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
				<h1 className="font-bold text-[24px] mb-6">Login</h1>
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
									placeholder="Enter Username"
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
								<PasswordInput onChange={onChange} value={value} />
							)}
							rules={{
								required: "Password is required",
							}}
						/>{" "}
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</div>
					<Button text={isLoading ? "Loading..." : "Login"} type="submit" />
				</form>

				<p className="text-center my-6">
					No account?{" "}
					<Link
						href={"/auth/register"}
						className="text-gradient-gold font-medium font-['Inter'] underline"
					>
						Register here
					</Link>
				</p>
			</div>
		</main>
	);
};

export default Login;
