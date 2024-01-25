"use client";
import FormEditAbout from "@/components/dashboard/FormEditAbout";
import FormEditInterest from "@/components/dashboard/FormEditInterest";
import SectionDashboard from "@/components/dashboard/SectionDashboard";
import Badge from "@/components/general/Badge";
import DangerAlert from "@/components/general/DangerAlert";
import Spinner from "@/components/general/Spinner";
import { useEditUser, useGetUser } from "@/hooks/api/users";
import { calculateAge } from "@/tools/helpers";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
	const { control, handleSubmit, reset } = useForm();
	const [isEditAbout, setIsEditAbout] = useState(false);
	const [isEditInterest, setIsEditInterest] = useState(false);
	const [errMessage, setErrMessage] = useState(null);
	const [image, setImage] = useState(null);
	const {
		data: detailUser,
		isLoading: isLoadingDetailUser,
		isSuccess: isSuccessDetailUser,
	} = useGetUser();
	const queryClient = useQueryClient();
	const { mutate } = useEditUser();
	useEffect(() => {
		if (isSuccessDetailUser) {
			reset(detailUser);
		}
	}, [detailUser, isSuccessDetailUser]);
	const onEditInterests = (data) => {
		mutate(
			{
				data: data,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["user-data"],
					});
					setIsEditInterest(false);
				},
				onError: (err) => {
					console.error(err);
					setErrMessage(err.response.data.message[0]);
				},
			}
		);
	};
	const onEditAbout = (data) => {
		setImage(data.image);
		const dataToSend = {
			...data,
			weight: parseInt(data.weight),
			height: parseInt(data.height),
		};
		delete dataToSend.image;
		mutate(
			{
				data: dataToSend,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["user-data"],
					});
					setIsEditAbout(false);
				},
				onError: (err) => {
					console.error(err);
					setErrMessage(err.response.data.message[0]);
				},
			}
		);
	};
	return (
		<main className=" flex flex-col items-center space-y-8 container mx-auto">
			{isLoadingDetailUser && isSuccessDetailUser ? (
				<Spinner />
			) : (
				<>
					{errMessage && <DangerAlert>{errMessage}</DangerAlert>}
					<div className="relative w-full h-48 bg-gray-900 rounded-2xl">
						{image && (
							<Image src={image} fill className="object-cover" alt="profile" />
						)}
						<span className="absolute bottom-5 left-5">
							@{detailUser?.username}
						</span>
					</div>
					{isEditAbout ? (
						<FormEditAbout
							onClick={onEditAbout}
							control={control}
							handleSubmit={handleSubmit}
						/>
					) : (
						<SectionDashboard
							title={"About"}
							onClick={() => setIsEditAbout(true)}
						>
							<div className="flex flex-col space-y-3">
								<p>
									<span className="text-white text-sm md:text-base text-opacity-50 mr-2">
										Birthday:
									</span>
									{detailUser?.birthday} ({calculateAge(detailUser?.birthday)}{" "}
									years old)
								</p>
								<p>
									<span className="text-white text-sm md:text-base text-opacity-50 mr-2">
										Horoscope:
									</span>
									{detailUser?.horoscope}
								</p>
								<p>
									<span className="text-white text-sm md:text-base text-opacity-50 mr-2">
										Zodiac:
									</span>
									{detailUser?.zodiac}
								</p>
								<p>
									<span className="text-white text-sm md:text-base text-opacity-50 mr-2">
										Height:
									</span>
									{detailUser?.height} cm
								</p>
								<p>
									<span className="text-white text-sm md:text-base text-opacity-50 mr-2">
										Weight:
									</span>
									{detailUser?.weight} kg
								</p>
							</div>
							{/* <p className="text-white text-opacity-50 text-sm font-medium">
								Add in your your to help others know you better
							</p> */}
						</SectionDashboard>
					)}
					{isEditInterest ? (
						<FormEditInterest
							onClick={onEditInterests}
							control={control}
							handleSubmit={handleSubmit}
						/>
					) : (
						<SectionDashboard
							title={"Interest"}
							onClick={() => setIsEditInterest(true)}
						>
							{detailUser?.interests?.length > 0 ? (
								<div className="flex items-center flex-wrap gap-3">
									{detailUser.interests.map((interest, index) => (
										<Badge key={index}> {interest}</Badge>
									))}
								</div>
							) : (
								<p className="text-white text-opacity-50 text-sm font-medium">
									Add in your interest to find a better match
								</p>
							)}
						</SectionDashboard>
					)}
				</>
			)}
		</main>
	);
};

export default Dashboard;
