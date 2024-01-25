import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
	persist(
		(set) => ({
			userData: null,
			login: ({ userData }) => {
				set({
					userData,
				});
			},
			logout: () => {
				set({
					userData: null,
				});
				localStorage.removeItem("auth:you-app-coding-test");
			},
		}),
		{
			name: "auth:you-app-coding-test",
			store: createJSONStorage(() => localStorage),
		}
	)
);

export default useAuthStore;
