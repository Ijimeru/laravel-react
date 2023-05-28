import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#06312f",
                secondary: "#f2f2f2",
                primaryButton: "#d58bfa",
                secondaryButton: "#b3e681",
                accent: "#0e8044",
                primaryDark: "#ffffff",
                secondaryDark: "#000000",
                primaryButtonDark: "#9d34da",
                secondaryButtonDark: "#1a1a1a",
                accentDark: "#bd73e8",
            },
            animation: {
                "spin-once": "spin 1s linear 1",
                translate: "translate 1s ease-in-out 1 forwards",
                translateDark: "translateDark 1s ease-in-out 1 forwards",
            },
            keyframes: {
                translate: {
                    "0%": { left: "0" },
                    "50%": { width: "100%" },
                    "100%": {
                        right: "0",
                    },
                },
                translateDark: {
                    "0%": { right: "0" },
                    "50%": { width: "100%" },
                    "100%": { left: "0" },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [forms],
};
