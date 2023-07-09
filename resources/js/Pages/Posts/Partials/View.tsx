import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CategoryType, PageProps, PostType, content } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { MdOutlineAccountCircle } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BsChatDots, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { CgFacebook } from "react-icons/cg";
import { FaCircle } from "react-icons/fa";
dayjs.extend(relativeTime);
export default function View({
    auth,
    logo,
    categories,
    post,
}: PageProps<{ logo: content; post: PostType; categories: CategoryType[] }>) {
    return (
        <Authenticated
            user={auth.user}
            logo={logo}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Post View
                    </h2>
                    <p className="mt-4 dark:text-primaryDark">
                        <Link
                            href={route("posts.index")}
                            className="dark:text-primaryButton"
                        >
                            posts
                        </Link>{" "}
                        / {post.title}
                    </p>
                </>
            }
        >
            <Head title={post.title} />
            <div className="flex flex-row mt-3 p-4 dark:text-primaryDark text-primary">
                <main className="flex-1">
                    <header>
                        <img
                            src={`/storage/${post.image}`}
                            alt="Hero Image"
                            className="rounded-md"
                        />
                        <h2 className="mt-4 text-3xl font-medium dark:text-accentDark text-accent">
                            {post.title}
                        </h2>
                    </header>
                    <div className="flex flex-row gap-x-2 mt-3">
                        <span className="border-r pr-2 flex flex-row gap-x-1 items-center">
                            <MdOutlineAccountCircle title="Author" />
                            {post.author.name.split(" ").slice(0, 2).join(" ")}
                        </span>

                        <span className="border-r pr-2 flex flex-row gap-x-1 items-center">
                            <AiTwotoneCalendar title="Published at" />
                            {dayjs(
                                post?.published_at
                                    ? post.published_at
                                    : post.created_at
                            )
                                .locale("id")
                                .format("D MMMM YYYY")}
                        </span>
                        <span className="border-r pr-2 flex flex-row gap-x-1 items-center">
                            <BsChatDots title="comments" /> No Comments
                        </span>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                        <BiCategory title="category" />
                        {post.categories.map((category, index, { length }) =>
                            index == length - 1
                                ? category.name
                                : category.name + " , "
                        )}
                    </div>
                    <div className="mt-8">
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    </div>
                    <div className="mt-8 border-t border-b py-6 flex flex-row items-center justify-between">
                        <span className="text-xl dark:text-accentDark text-accent">
                            Bagikan informasi:
                        </span>
                        <div className="flex flex-row gap-x-3">
                            <a
                                className="p-3 bg-[#3B5998] rounded-md"
                                target="_blank"
                                href={`https://www.facebook.com/sharer.php?u=${window.location}`}
                            >
                                <CgFacebook className="text-2xl" />
                            </a>

                            <a
                                className="px-4 bg-[#1DA1F2] rounded-md items-center flex flex-row"
                                target="_blank"
                                href={`https://twitter.com/intent/tweet?url=${window.location}`}
                            >
                                <BsTwitter className="text-lg " />
                            </a>
                            <a
                                className="p-3 bg-[#25D366] rounded-md items-center flex flex-row"
                                target="_blank"
                                href={`https://api.whatsapp.com/send?text=*${post.title}*     ${post.excerpt} selengkapnya cek di : ${window.location}`}
                            >
                                <BsWhatsapp className="text-2xl" />
                            </a>
                        </div>
                    </div>
                </main>
                <nav className="flex-grow-[0.4] flex-1 p-6 flex flex-col gap-y-20">
                    <div className="border-t">
                        <h2 className="mt-4 text-lg mb-6 text-accent dark:text-accentDark">
                            Kategori Informasi
                        </h2>
                        <ul className="flex flex-col text-lg gap-y-2">
                            {categories.map((category) => (
                                <Link
                                    href={route("berita", {
                                        category: category.name,
                                    })}
                                >
                                    <li className="border-b flex flex-row items-center justify-between">
                                        <span>{category.name}</span>
                                        <span className="text-base">
                                            ({category.posts?.length})
                                        </span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    {categories.filter(
                        (category) => category.name == "Pengumuman"
                    )[0].posts?.length! > 0 && (
                        <div className="border-t">
                            <h2 className="mt-4 text-lg mb-6">Pengumuman</h2>
                            <ul className="flex flex-col text-lg gap-y-2">
                                {categories
                                    .filter(
                                        (category) =>
                                            category.name == "Pengumuman"
                                    )[0]
                                    .posts?.map((post) => (
                                        <Link
                                            href={route(
                                                "posts.show",
                                                post.slug
                                            )}
                                            className="border p-4 rounded-md"
                                        >
                                            <h2 className="font-semibold">
                                                {post.title}
                                            </h2>
                                            <p className="flex flex-row items-center mt-2 gap-x-2 text-xs dark:text-accentDark text-accent">
                                                <FaCircle />
                                                {dayjs(
                                                    post.published_at
                                                        ? post.published_at
                                                        : post?.created_at
                                                )
                                                    .locale("id")
                                                    .format("DD MMMM YYYY")}
                                            </p>
                                        </Link>
                                    ))}
                            </ul>
                        </div>
                    )}
                    {categories.filter(
                        (category) => category.name == "Akademik"
                    )[0].posts?.length! > 0 && (
                        <div className="border-t">
                            <h2 className="mt-4 text-lg mb-6">Akademik</h2>
                            <ul className="flex flex-col text-lg gap-y-2">
                                {categories
                                    .filter(
                                        (category) =>
                                            category.name == "Akademik"
                                    )[0]
                                    .posts?.map((post) => (
                                        <Link
                                            href={route(
                                                "posts.show",
                                                post.slug
                                            )}
                                            className="border p-4 rounded-md"
                                        >
                                            <h2 className="font-semibold">
                                                {post.title}
                                            </h2>
                                            <p className="flex flex-row items-center mt-2 gap-x-2 text-xs dark:text-accentDark text-accent">
                                                <FaCircle />
                                                {dayjs(
                                                    post.published_at
                                                        ? post.published_at
                                                        : post?.created_at
                                                )
                                                    .locale("id")
                                                    .format("DD MMMM YYYY")}
                                            </p>
                                        </Link>
                                    ))}
                            </ul>
                        </div>
                    )}
                </nav>
            </div>
        </Authenticated>
    );
}
