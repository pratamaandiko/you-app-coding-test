import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseURL = process.env.API_URL;

export const useLogin = () => {
	return useMutation({
		mutationFn: async ({ data }) => {
			const res = await axios.post(baseURL + "/api/login", data);

			return res.data;
		},
	});
};
export const useRegister = () => {
	return useMutation({
		mutationFn: async ({ data }) => {
			const res = await axios.post(baseURL + "/api/register", data);

			return res.data;
		},
	});
};
