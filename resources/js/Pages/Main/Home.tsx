import Card from "@/Components/Card";
import SecondaryButton from "@/Components/SecondaryButton";
import Main from "@/Layouts/MainLayout";
import { useScroll } from "@/hooks/useScroll";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import { BsNewspaper } from "react-icons/bs";
import { FaArrowRight, FaCircle } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const Home = () => {
    interface CardType {
        icon: React.JSX.Element;
        title: string;
        desc: string;
        href: string;
    }
    const className: string = "text-4xl";
    const cards: CardType[] = [
        {
            icon: <HiOutlineAcademicCap className={className} />,
            title: "Bakmi TK",
            desc: "Bank soal teknik kimia",
            href: route("home"),
        },
        {
            icon: <BsNewspaper className={className} />,
            title: "Berita",
            desc: "Berita terbaru",
            href: route("home"),
        },
        {
            icon: <MdOutlineLocalGroceryStore className={className} />,
            title: "Tekia Store",
            desc: "Toko online",
            href: route("home"),
        },
    ];
    return (
        <Main>
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
                    </h6>
                    <div className="flex flex-col h-full w-full bg-[#680000] opacity-30 absolute"></div>
                </div>
            </section>
            <section className="flex md:flex-row flex-col w-full justify-center p-3 md:gap-x-4 gap-y-3 container m-auto -mt-16 relative">
                {cards.map((card, index) => (
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
                ))}
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
                        href={route("profil")}
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
                    <div className="flex flex-col gap-y-3">
                        <div className="grid xl:grid-cols-4 gap-3 md:grid-cols-2 grid-cols-1">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                <Link href={route("home")} key={num}>
                                    <Card />
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={route("home")}
                            className="bg-primaryDark py-2 px-4 rounded-md mt-3 w-fit border-2 border-secondaryButton text-accent flex flex-row gap-x-2 items-center hover:bg-accent transition-colors hover:text-secondary dark:bg-secondaryButtonDark dark:text-accentDark dark:border-accentDark hover:dark:bg-accentDark dark:hover:text-primaryDark"
                        >
                            Lihat semua Berita
                            <FaArrowRight />
                        </Link>
                    </div>
                    <div className="bg-secondaryButton dark:bg-secondaryButtonDark h-full p-[35px] rounded-md md:w-3/4 sticky top-20 w-full">
                        <h2 className="font-semibold text-2xl text-primary dark:text-primaryButton">
                            Kategori Informasi
                        </h2>
                        <ul className="mt-5 font-semibold">
                            <Link
                                href={route("home")}
                                className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                            >
                                <li>Akademik</li>
                                <span>(5)</span>
                            </Link>
                            <Link
                                href={route("home")}
                                className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                            >
                                <li>Berita</li>
                                <span>(5)</span>
                            </Link>
                            <Link
                                href={route("home")}
                                className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                            >
                                <li>Mahasiswa</li>
                                <span>(5)</span>
                            </Link>
                            <Link
                                href={route("home")}
                                className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                            >
                                <li>Pengumuman</li>
                                <span>(5)</span>
                            </Link>
                            <Link
                                href={route("home")}
                                className="flex flex-row justify-between gap-x-4 items-center border-b border-primaryDark"
                            >
                                <li>Prentasi Mahasiswa</li>
                                <span>(5)</span>
                            </Link>
                        </ul>
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Home;
