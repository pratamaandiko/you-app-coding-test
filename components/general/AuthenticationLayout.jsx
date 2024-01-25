"use client";
import React, { useEffect } from "react";
import useAuthStore from "@/hooks/useAuthStore";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

const AuthenticationLayout = ({ children }) => {
	const router = useRouter();
	const userData = useAuthStore((state) => state.userData);
	useEffect(() => {
		if (!userData) {
			router.push("/auth/login");
		}
	}, [userData]);

	if (!userData) {
		return (
			<div className="h-[100vh] flex justify-center items-center">
				<Spinner />
			</div>
		);
	} else {
		return <>{children}</>;
	}
};

export default AuthenticationLayout;
