import { ButtonHTMLAttributes } from "react";

export default function SuccessButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-[rgb(14,192,67)] opacity-80 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[rgb(14,192,67)] hover:opacity-70 active:bg-[rgb(14,192,67)] active:opacity-100 focus:outline-none focus:ring-2 focus:ring-[rgb(14,192,67)] focus:ring-opacity-100 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
