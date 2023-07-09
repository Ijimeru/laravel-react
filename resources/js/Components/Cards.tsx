import { Link, usePage } from "@inertiajs/react";
import { FaArrowRight } from "react-icons/fa";
import Card from "./Card";
import { CategoryType, PageProps, PostType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Pagination from "./Pagination";

export default function Cards({
    className,
    childClassName,
    category,
    btnText,
    posts,
    current,
    setCurrent,
    length,
    noButton,
    pagination,
    jumlahPostPerHalaman,
    selectedOptions,
}: {
    className?: string;
    category?: string;
    current?: number;
    setCurrent?: Dispatch<SetStateAction<number>>;
    selectedOptions?: CategoryType[];
    jumlahPostPerHalaman?: number;
    childClassName?: string;
    btnText?: string;
    posts?: PostType[];
    length?: number;
    noButton?: boolean;
    pagination?: boolean;
}) {
    const currentPage = current;
    const jumlahHalaman = Math.ceil(posts?.length! / jumlahPostPerHalaman!);
    const start = (currentPage! - 1) * jumlahPostPerHalaman!;
    const stop =
        currentPage != jumlahHalaman
            ? start + jumlahPostPerHalaman!
            : jumlahHalaman * jumlahPostPerHalaman! - posts?.length! != 0
            ? posts?.length
            : start + jumlahPostPerHalaman!;
    useEffect(() => {
        pagination
            ? setCardPosts(posts?.slice(start, stop))
            : setCardPosts(posts?.slice(0, length));
    }, [jumlahPostPerHalaman, currentPage, selectedOptions, posts]);

    const [cardPosts, setCardPosts] = useState<PostType[] | undefined>(
        pagination
            ? posts?.slice(start, stop)
            : length
            ? posts?.slice(0, length)
            : posts
    );
    return (
        <div className="flex flex-col gap-y-3">
            <div
                className={
                    `grid xl:grid-cols-4 gap-3 md:grid-cols-2 grid-cols-1 ` +
                    className
                }
            >
                {cardPosts?.map((post) => (
                    <Link href={`berita/${post.slug}`} key={post.id}>
                        <Card childClassName={childClassName} post={post} />
                    </Link>
                ))}
            </div>
            {noButton ? null : (
                <Link
                    href={route("berita", {
                        category: category ? category : "",
                    })}
                    className="bg-primaryDark py-2 px-4 rounded-md mt-3 w-fit border-2 border-secondaryButton text-accent flex flex-row gap-x-2 items-center hover:bg-accent transition-colors hover:text-secondary dark:bg-secondaryButtonDark dark:text-accentDark dark:border-accentDark hover:dark:bg-accentDark dark:hover:text-primaryDark"
                >
                    {btnText ? btnText : "Lihat semua Berita"}
                    <FaArrowRight />
                </Link>
            )}
            {pagination ? (
                <Pagination
                    current={current!}
                    setCurrent={setCurrent!}
                    jumlahPost={posts?.length!}
                    jumlahPostPerHalaman={jumlahPostPerHalaman!}
                />
            ) : null}
        </div>
    );
}
