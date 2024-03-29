"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 5 * (60 * 1000), // 5 mins
						cacheTime: 10 * (60 * 1000), // 10 mins
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children} <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
