import "./globals.css";
import Providers from "./providers";

export const metadata = {
	title: "YouApp",
	description: "YouApp",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className="[background:radial-gradient(50%_50%_at_50%_50%,rgb(31,66,71)_0%,rgb(13.3,28.98,34.79)_56.18%,rgb(9,20,26)_100%)]"
				suppressHydrationWarning={true}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
