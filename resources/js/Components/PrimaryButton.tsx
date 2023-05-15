import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-primaryButton dark:bg-primaryButtonDark border border-transparent rounded-md font-semibold text-xs text-primary dark:text-primaryDark uppercase tracking-widest hover:bg- dark:hover:bg-primaryButton focus:bg-primaryButton dark:focus:bg-primaryButton active:bg-primaryButton dark:active:bg-primaryButtonDark focus:outline-none focus:ring-2 focus:ring-primaryButton focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
                    disabled && "opacity-50"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
