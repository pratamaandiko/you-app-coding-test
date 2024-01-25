import authAxios from "@/tools/interceptors";
import { useMutation, useQuery } from "@tanstack/react-query";
const baseURL = process.env.API_URL;
export const useGetUser = () => {
	return useQuery({
		queryKey: ["user-data"],
		queryFn: async () => {
			const res = await authAxios(baseURL + "/api/getProfile");
			return res.data.data;
		},
	});
};

export const useEditUser = () => {
	return useMutation({
		mutationFn: async ({ data }) => {
			const res = await authAxios.put(baseURL + "/api/updateProfile", data);

			return res.data;
		},
	});
};
