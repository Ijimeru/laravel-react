import MainFooter from "@/Components/MainFooter";
import Navbar from "@/Components/Navbar";
import Navbarcoba from "@/Components/Navbarcoba";
import HomeProvider from "@/Context/HomeContext";
import { HTMLAttributes, useEffect } from "react";

export default function Main({ children }: HTMLAttributes<HTMLDivElement>) {
    useEffect(() => {
        if (localStorage.getItem("mode")) {
            document.body.classList.add(localStorage.getItem("mode")!);
        } else {
            localStorage.setItem("mode", "light");
        }
    }, []);
    return (
        <HomeProvider>
            <div
                className={`flex justify-between flex-col bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark scroll-smooth`}
            >
                <Navbar />
                <div className="min-h-[calc(100vh-72px-410px)]">{children}</div>

                <br />
                <MainFooter />
            </div>
        </HomeProvider>
    );
}
