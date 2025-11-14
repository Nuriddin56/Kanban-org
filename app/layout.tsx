import { Provider } from "react-redux";
import store from "../components/redux/store";

export const metadata = {
  title: "My Kanban App",
  description: "Kanban board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
