import ApplicationLogo from "@/Components/ApplicationLogo";
import DriveLink from "@/utils/DriveLink";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({
    children,
    logo,
}: PropsWithChildren<{ logo?: { content: string } }>) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            <div>
                <Link href="/">
                    <img
                        src={DriveLink(logo!.content)}
                        alt="Logo-Himatekia"
                        width={200}
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
