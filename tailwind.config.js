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
        },
    },
    darkMode: "class",
    plugins: [forms],
};
