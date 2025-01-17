
import { ThemeModeProvider } from "@/_metronic/partials";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "Talentslist",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
       
            <ToastContainer />
            {children}
        </>
    );
}
