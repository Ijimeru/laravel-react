import Cards from "@/Components/Cards";
import Main from "@/Layouts/MainLayout";
import { CategoryType, PageProps, PostType, content } from "@/types";
import { checkSubsequence } from "@/utils/CheckSubsequence";
import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";
import { FaArrowRight, FaCircle } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { toast } from "react-toastify";

export default function Home({
    posts,
    categories,
    logo,
    visi,
    kontak,
    auth,
}: PageProps<{
    posts: PostType[];
    categories: CategoryType[];
    logo: content;
    visi: content;
    kontak: content;
}>) {
    interface CardType {
        icon: React.JSX.Element;
        title: string;
        desc: string;
        href?: string;
    }
    const className: string = "text-4xl";
    const cards: CardType[] = [
        {
            icon: <HiOutlineAcademicCap className={className} />,
            title: "Bakmi TK",
            desc: "Bank soal teknik kimia",
            href: route("buku"),
        },
        {
            icon: <BsNewspaper className={className} />,
            title: "Berita",
            desc: "Berita terbaru",
            href: route("berita"),
        },
        {
            icon: <MdOutlineLocalGroceryStore className={className} />,
            title: "Tekia Store",
            desc: "Toko online",
        },
    ];
    const page = usePage<PageProps>();
    return (
        <Main logo={logo} visi={visi} kontak={kontak}>
            <Head title="Home" />

            <section>
                <div className="bg-[url('/img/hero-img.jpg')] h-[24rem] bg-cover bg-center bg-no-repeat bg-white relative flex justify-center items-center flex-col text-center">
                    <section className="h-full w-full bg-[#680000] opacity-30 absolute"></section>
                    <h3 className="font-extrabold text-3xl text-primaryDark z-10">
                        Himpunan Mahasiswa Teknik Kimia
                    </h3>
                    <h6 className="text-primaryDark font-extrabold text-xl z-10">
                        Institut Teknologi Sumatera
                    </h6>
                    <h6 className="text-primaryDark text-base z-10 mt-3">
                        Menjadi wadah bagi mahasiswa teknik kimia Institut
                        Teknologi Sumatera
                        {/* {auth.user.roles
                            .map((role) => role.role)
                            .includes("super_admin") ? (
                            <div>basing</div>
                        ) : null} */}
                    </h6>
                    <div className="flex flex-col h-full w-full bg-[#680000] opacity-30 absolute"></div>
                </div>
            </section>
            <section className="flex md:flex-row flex-col w-full justify-center p-3 md:gap-x-4 gap-y-3 container m-auto -mt-16 relative">
                {cards.map((card, index) =>
                    card.href ? (
                        <Link href={card.href} className="w-full" key={index}>
                            <div className="flex-1 bg-primaryDark dark:bg-secondaryButtonDark shadow-sm p-4 rounded-md flex flex-row md:gap-x-2 gap-x-5 hover:shadow-2xl hover:scale-110 transition-all cursor-pointer">
                                <span>{card.icon}</span>
                                <div>
                                    <div className="font-semibold">
                                        {card.title}
                                    </div>
                                    <div>{card.desc}</div>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div
                            className="w-full"
                            key={index}
                            onClick={() =>
                                toast.warning("Coming soon", {
                                    position: "top-center",
                                })
                            }
                        >
                            <div className="flex-1 bg-primaryDark dark:bg-secondaryButtonDark shadow-sm p-4 rounded-md flex flex-row md:gap-x-2 gap-x-5 hover:shadow-2xl hover:scale-110 transition-all cursor-pointer">
                                <span>{card.icon}</span>
                                <div>
                                    <div className="font-semibold">
                                        {card.title}
                                    </div>
                                    <div>{card.desc}</div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </section>
            <section className="py-10 container m-auto flex md:flex-row flex-col-reverse justify-center px-3 xl:gap-x-24">
                <div className="md:w-3/5 lg:w-[40%]">
                    <div className="flex flex-row items-center gap-x-1">
                        <span>
                            <FaCircle className="text-[6px] text-accent dark:text-accentDark" />
                        </span>
                        <span className="self-center text-sm">Tentang</span>
                    </div>
                    <div className="mt-2">
                        <h2 className="font-extraboldbold text-5xl text-primary dark:text-primaryDark">
                            Himatekia ITERA
                        </h2>
                        <br />
                        <p>
                            Teknik Kimia merupakan cabang ilmu teknik yang
                            mempelajari bagaimana proses dan cara mengubah bahan
                            baku/mentah dan bahan kimia menjadi sebuah produk
                            yang lebih bernilai secara komersial dengan
                            memanfaatkan proses-proses kimia, seperti reaksi
                            kimia dan biokimia maupun perubahan sifat fisik dan
                            kimia bahan mentah.
                        </p>
                    </div>
                    <br />
                    <Link
                        href={route("sejarahvisimisi")}
                        className="bg-primaryDark py-2 px-4 rounded-md mt-3 w-fit border-2 border-secondaryButton text-accent flex flex-row gap-x-2 items-center hover:bg-accent transition-colors hover:text-secondary dark:bg-secondaryButtonDark dark:text-accentDark dark:border-accentDark hover:dark:bg-accentDark dark:hover:text-primaryDark"
                    >
                        Selengkapnya
                        <span>
                            <FaArrowRight />
                        </span>
                    </Link>
                </div>
                <div className="relative bg-[url('/img/tentang.jpg')] md:w-2/5 lg:w-[30%] h-96 bg-center bg-cover ml-5 rounded-tr-[50%] rounded-br-[50%] rounded-bl-[48%]">
                    <img
                        src="/img/akreditasi.png"
                        alt="akreditasi"
                        className="absolute w-24 md:bottom-0 md:left-10 left-1/2 bottom-0 -translate-x-1/2"
                    />
                </div>
            </section>
            <section className="py-10 container m-auto px-3">
                <span className="after:content-[''] after:border-t-[3px] after:border-primaryButton  after:w-full after:block flex items-center flex-row gap-x-2">
                    <h2 className="text-3xl font-semibold flex-shrink-0">
                        Berita Terbaru
                    </h2>
                </span>
                <div className="mt-6 flex md:flex-row gap-x-4 flex-col gap-y-4 ">
                    <Cards posts={posts} length={5} />
                    <div className="bg-secondaryButton dark:bg-secondaryButtonDark h-full p-[35px] rounded-md md:w-3/4 sticky top-20 w-full">
                        <h2 className="font-semibold text-2xl text-primary dark:text-primaryButton">
                            Kategori Informasi
                        </h2>
                        <ul className="mt-5 font-semibold">
                            {categories
                                ?.sort(
                                    (a, b) =>
                                        b.posts?.length! - a.posts?.length!
                                )
                                .slice(0, 5)
                                .map((category) => (
                                    <Link
                                        href={route("berita", {
                                            category: category.name,
                                        })}
                                        key={category.id}
                                        className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                                    >
                                        <li>{category.name}</li>
                                        <span>({category.posts?.length})</span>
                                    </Link>
                                ))}
                        </ul>
                        {categories?.length >= 5 ? (
                            <Link
                                href={route("home")}
                                className="bg-primaryDark py-2 px-4 rounded-md mt-3 w-fit border-2 border-secondaryButton text-accent flex flex-row gap-x-2 items-center hover:bg-accent transition-colors
                                text-sm hover:text-secondary dark:bg-secondaryButtonDark dark:text-accentDark dark:border-accentDark hover:dark:bg-accentDark dark:hover:text-primaryDark"
                            >
                                Lihat Semua Kategori
                                <FaArrowRight />
                            </Link>
                        ) : null}
                    </div>
                </div>
            </section>
            <section className="py-10 container m-auto px-3 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0">
                <div className="md:p-[10px_40px_10px_10px]">
                    <span className="after:content-[''] after:border-t-[3px] after:border-accent  after:w-full after:block flex items-center flex-row gap-x-2">
                        <h2 className="text-3xl font-semibold flex-shrink-0">
                            Pengumuman
                        </h2>
                    </span>
                    <div className="mt-6 flex md:flex-row gap-x-4 flex-col gap-y-4 ">
                        <Cards
                            className="grid-cols-2"
                            childClassName="text-[15px]"
                            btnText="Lihat Semua"
                            category="Akademik"
                            posts={posts.filter((post) =>
                                checkSubsequence(post.categories, [
                                    "Pengumuman",
                                ])
                            )}
                            length={5}
                        />
                    </div>
                </div>
                <div className="md:p-[10px_10px_10px_40px]">
                    <span className="after:content-[''] after:border-t-[3px] after:border-accentDark  after:w-full after:block flex items-center flex-row gap-x-2">
                        <h2 className="text-3xl font-semibold flex-shrink-0">
                            Akademik
                        </h2>
                    </span>
                    <div className="mt-6 flex md:flex-row gap-x-4 flex-col gap-y-4 ">
                        <Cards
                            className="grid-cols-2"
                            childClassName="text-[15px]"
                            btnText="Lihat Semua"
                            category="Akademik"
                            posts={posts.filter((post) =>
                                checkSubsequence(post.categories, ["Akademik"])
                            )}
                            length={5}
                        />
                    </div>
                </div>
            </section>
            <section>
                <div className="bg-[url('/img/hero-img.jpg')] min-h-[24rem] bg-cover bg-center bg-no-repeat bg-white relative flex justify-center items-center flex-col text-center py-20">
                    <section className="h-full w-full bg-[#680000] opacity-30 absolute"></section>
                    <h3 className="font-extrabold text-[14px] text-primaryDark z-10 flex flex-row items-center gap-x-1">
                        <FaCircle className="text-[6px]" />
                        Tautan Cepat
                    </h3>
                    <h6 className="text-[#F6DF0C] font-extrabold text-2xl z-10 w-2/5">
                        Jelajahi Lebih Jauh Tentang Himpunan Teknik Kimia ITERA
                    </h6>
                    <section className="flex md:flex-row flex-col w-full justify-center p-3 md:gap-x-4 gap-y-3 container m-auto z-10">
                        {cards.map((card, index) =>
                            card.href ? (
                                <Link
                                    href={card.href}
                                    className="w-full"
                                    key={index}
                                >
                                    <div className="flex-1 bg-primaryDark dark:bg-secondaryButtonDark shadow-sm p-4 rounded-md flex flex-row md:gap-x-2 gap-x-5 hover:shadow-2xl hover:scale-110 transition-all cursor-pointer">
                                        <span>{card.icon}</span>
                                        <div>
                                            <div className="font-semibold">
                                                {card.title}
                                            </div>
                                            <div>{card.desc}</div>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div
                                    className="w-full"
                                    key={index}
                                    onClick={() =>
                                        toast.warning("Coming soon", {
                                            position: "top-center",
                                        })
                                    }
                                >
                                    <div className="flex-1 bg-primaryDark dark:bg-secondaryButtonDark shadow-sm p-4 rounded-md flex flex-row md:gap-x-2 gap-x-5 hover:shadow-2xl hover:scale-110 transition-all cursor-pointer">
                                        <span>{card.icon}</span>
                                        <div>
                                            <div className="font-semibold">
                                                {card.title}
                                            </div>
                                            <div>{card.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </section>
                </div>
            </section>
            <section className="py-10 container m-auto flex flex-col justify-center px-3 gap-y-3">
                <div className="flex flex-row items-center gap-x-1 justify-center">
                    <span>
                        <FaCircle className="text-[6px] text-accent dark:text-accentDark" />
                    </span>
                    <span className="self-center text-sm">Dokumentasi</span>
                </div>
                <div className="flex justify-center">
                    <h2 className="text-center text-3xl font-semibold text-accent dark:text-accentDark">
                        Galeri & Dokumentasi Himatekia ITERA
                    </h2>
                </div>
                <div className="flex justify-center gap-x-3">
                    {categories
                        .sort((a, b) => b.posts?.length! - a.posts?.length!)
                        .slice(0, 4)
                        .map((val, key) => (
                            <Link
                                href={route("home", { category: val.name })}
                                preserveScroll
                                key={key}
                                className={`text-sm md:text-base p-[5px_13px] rounded-3xl hover:bg-secondaryButton hover:opacity-80 flex items-center ${
                                    val.name ==
                                    (page.props.ziggy.query.category
                                        ? page.props.ziggy.query.category
                                        : categories.sort(
                                              (a, b) =>
                                                  b.posts?.length! -
                                                  a.posts?.length!
                                          )[0].name)
                                        ? "bg-secondaryButton text-accent"
                                        : ""
                                }`}
                            >
                                {val.name}
                            </Link>
                        ))}
                </div>
                <div
                    className={`${
                        posts
                            .filter((post) =>
                                post.categories
                                    .map((category) => category.name)
                                    .includes(
                                        page.props.ziggy.query.category
                                            ? page.props.ziggy.query.category
                                            : categories.sort(
                                                  (a, b) =>
                                                      b.posts?.length! -
                                                      a.posts?.length!
                                              )[0].name
                                    )
                            )
                            .slice(0, 8).length > 0
                            ? "grid md:grid-cols-4 grid-cols-2 gap-4"
                            : ""
                    }`}
                >
                    {posts
                        .filter((post) =>
                            post.categories
                                .map((category) => category.name)
                                .includes(
                                    page.props.ziggy.query.category
                                        ? page.props.ziggy.query.category
                                        : categories.sort(
                                              (a, b) =>
                                                  b.posts?.length! -
                                                  a.posts?.length!
                                          )[0].name
                                )
                        )
                        .slice(0, 8).length > 0 ? (
                        posts
                            .filter((post) =>
                                post.categories
                                    .map((category) => category.name)
                                    .includes(
                                        page.props.ziggy.query.category
                                            ? page.props.ziggy.query.category
                                            : categories.sort(
                                                  (a, b) =>
                                                      b.posts?.length! -
                                                      a.posts?.length!
                                              )[0].name
                                    )
                            )
                            .slice(0, 8)
                            .map((val, key) => (
                                <div
                                    className="overflow-hidden rounded-lg group relative"
                                    key={key}
                                >
                                    <img
                                        src={`/storage/${val.image}`}
                                        alt="dummy"
                                        className="rounded-lg hover:scale-110 transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <Link
                                        href={`berita/${val.slug}`}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-primaryDark opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 z-10"
                                    >
                                        <AiOutlineSearch />
                                    </Link>
                                    <section className="bg-[#680000] h-full w-full absolute opacity-0 group-hover:opacity-30 transition-opacity top-0"></section>
                                </div>
                            ))
                    ) : (
                        <p className="text-center w-full">Tidak ada berita</p>
                    )}
                </div>
            </section>
        </Main>
    );
}
