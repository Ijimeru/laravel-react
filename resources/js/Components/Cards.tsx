import { Link } from "@inertiajs/react";
import { FaArrowRight } from "react-icons/fa";
import Card from "./Card";

export default function Cards({
    className,
    childClassName,
    btnText,
}: {
    className?: string;
    childClassName?: string;
    btnText?: string;
}) {
    return (
        <div className="flex flex-col gap-y-3">
            <div
                className={
                    `grid xl:grid-cols-4 gap-3 md:grid-cols-2 grid-cols-1 ` +
                    className
                }
            >
                {[1, 2, 3, 4, 5].map((num) => (
                    <Link href={route("home")} key={num}>
                        <Card childClassName={childClassName} />
                    </Link>
                ))}
            </div>
            <Link
                href={route("home")}
                className="bg-primaryDark py-2 px-4 rounded-md mt-3 w-fit border-2 border-secondaryButton text-accent flex flex-row gap-x-2 items-center hover:bg-accent transition-colors hover:text-secondary dark:bg-secondaryButtonDark dark:text-accentDark dark:border-accentDark hover:dark:bg-accentDark dark:hover:text-primaryDark"
            >
                {btnText ? btnText : "Lihat semua Berita"}
                <FaArrowRight />
            </Link>
        </div>
    );
}
