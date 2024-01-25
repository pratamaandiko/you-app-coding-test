import axios from "axios";

const authAxios = axios.create({
	baseURL: process.env.API_URL,
});

authAxios.interceptors.request.use(
	(config) => {
		const userData = JSON.parse(
			localStorage.getItem("auth:you-app-coding-test")
		);
		if (userData) {
			config.headers[
				"x-access-token"
			] = `${userData.state.userData.access_token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

authAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.error(error);
		if (error.response.status === 401 || error.response.status === 403) {
			window.location = "/auth/login";
			localStorage.removeItem("auth:you-app-coding-test");
		}
		if (
			error.response.status === 500 &&
			error.response.data.error.name == "TokenExpiredError"
		) {
			window.location = "/auth/login";
			localStorage.removeItem("auth:you-app-coding-test");
		}
		return Promise.reject(error);
	}
);
export default authAxios;
