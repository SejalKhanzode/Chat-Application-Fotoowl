import "./layout.css";
import { AuthProvider } from "../context/AuthContext";
import {MessageProvider} from "../context/MessageContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><AuthProvider>
        <MessageProvider>
        {children}
        </MessageProvider></AuthProvider>
      </body>
    </html>
  );
}
