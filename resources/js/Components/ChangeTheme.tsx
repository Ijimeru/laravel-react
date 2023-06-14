import { useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

export default function ChangeTheme({ className }: { className?: string }) {
    const [mode, setMode] = useState<string | null>(
        localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    );
    const [click, setClick] = useState<boolean>(false);
    return (
        <div
            className={
                `text-2xl dark:border-secondary border-2 rounded-full border-secondaryDark  dark:bg-slate-800 flex-row gap-x-4 relative transition-all ` +
                className
            }
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
            <span
                className={`absolute bg-slate-400 dark:bg-black rounded-full top-1/2 -translate-y-1/2 w-6 h-full  transition-all ${
                    mode == "light" ? "right-0" : ""
                } ${mode === "dark" ? "" : "dark:left-0"} ${
                    mode === "light" ? "animate-translate" : ""
                } ${mode === "dark" ? "dark:animate-translateDark" : ""}`}
                style={click ? undefined : { animation: "none" }}
            ></span>
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
