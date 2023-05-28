import { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default function ChangeTheme() {
    const [mode, setMode] = useState<string | null>(
        localStorage.getItem("mode")
    );
    const [click, setClick] = useState<boolean>(false);
    return (
        <div
            className={`text-2xl dark:border-secondary border-2 rounded-full border-secondaryDark  dark:bg-slate-800 hidden md:flex flex-row gap-x-4 relative after:content-[''] after:absolute after:bg-slate-400 dark:after:bg-black after:rounded-full after:top-1/2 after:-translate-y-1/2 after:w-6 after:h-full transition-all after:transition-all ${
                mode === "light" ? "after:right-0" : ""
            }${mode === "light" ? "after:animate-translate" : ""}${
                mode === "dark" ? "after:dark:animate-translateDark" : ""
            } ${click ? "" : "after:animate-none after:dark:animate-none"}`}
            title="Change theme"
            id="theme"
            onClick={(e) => {
                const event = e.target as HTMLDivElement;
                if (mode == "dark" && event.id == "light") {
                    setClick(true);
                } else if (mode == "light" && event.id == "dark") {
                    setClick(true);
                }
            }}
        >
            <CiDark
                id="dark"
                className="z-10 cursor-pointer hover:text-blue-700 dark:text-blue-700"
                onClick={() => {
                    document.body.classList.add("dark");
                    localStorage.setItem("mode", "dark");
                    setMode("dark");
                }}
            />
            <CiLight
                id="light"
                className="z-10 cursor-pointer hover:text-yellow-200 dark:text-primaryDark text-yellow-200"
                onClick={() => {
                    localStorage.setItem("mode", "light");
                    document.body.classList.remove("dark");
                    setMode("light");
                }}
            />
        </div>
    );
}
