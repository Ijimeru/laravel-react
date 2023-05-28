import Navbar from "@/Components/Navbar";
import { HTMLAttributes, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Main({ children }: HTMLAttributes<HTMLDivElement>) {
    useEffect(() => {
        if (localStorage.getItem("mode")) {
            document.body.classList.add(localStorage.getItem("mode")!);
        }
    });
    return (
        <div
            className={`flex justify-between flex-col bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark scroll-smooth`}
        >
            <Navbar />
            <div className="min-h-[calc(100vh-72px-144px)]">{children}</div>
            <footer className="h-36 dark:bg-gradient-to-t dark:from-secondaryButtonDark dark:to-secondaryDark bg-gradient-to-t from-primaryDark to-secondary text-center">
                <p className="py-[15px]">
                    &copy; 2023 HIMATEKIA. All rights reserved.
                </p>
                <div className="flex justify-center items-center text-lg gap-x-3">
                    <a href="#">
                        <FaFacebook className="transition-all hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaTwitter className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaInstagram className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaYoutube className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
