import { ButtonHTMLAttributes } from "react";

export default function PublishButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-[#5123E8] opacity-80 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#5123E8] hover:opacity-70 active:bg-[#5123E8] active:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#5123E8] focus:ring-opacity-100 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
