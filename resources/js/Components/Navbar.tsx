import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    GiHamburgerMenu,
    RiArrowDropDownLine,
    VscAccount,
} from "react-icons/all";
import ChangeTheme from "./ChangeTheme";
import NavLink from "./NavLinkMain";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { useWindowSize } from "@/hooks/useWindowSize";
import MainNavList from "./MainNavList";

export default function Navbar() {
    const [account, setAccount] = useState<boolean>(false);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);
    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize.width! > 768) {
            setSidebarActive(false);
            document.body.style.overflow = "auto";
        }
    }, [windowSize.width]);
    return (
        <nav className="w-full h-fit bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark transition-all duration-1000 z-[11] sticky top-0">
            <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
                <Link href={route("home")}>
                    <img
                        src="/img/logo-himatekia.png"
                        alt=""
                        className="w-10"
                    />
                </Link>
                <MainNavList />

                <div className="flex flex-row items-center gap-x-10">
                    <ChangeTheme className="hidden md:flex" />
                    <div className="relative flex justify-center items-center group select-none">
                        <div
                            onClick={() => setAccount((prev) => !prev)}
                            className={`${
                                account
                                    ? "after:content-[''] after:fixed after:top-0 after:bottom-0 after:left-0 after:right-0 after:cursor-default"
                                    : ""
                            }`}
                        >
                            <VscAccount
                                className={`cursor-pointer text-2xl hover:text-primaryButton hover:dark:text-primaryButtonDark  transition-colors duration-500 z-50`}
                            />
                        </div>
                        <div className="absolute -bottom-10 bg-primaryButton dark:bg-primaryButtonDark text-primary dark:text-primaryDark capitalize  px-3 rounded-xl before:content-[''] before:w-3 before:h-3 before:bg-primaryButton before:dark:bg-primaryButtonDark before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-1 before:rotate-45 cursor-default opacity-0 hidden group-hover:opacity-100 group-hover:block transition-opacity duration-500">
                            account
                        </div>
                        {account ? (
                            <section className="absolute h-fit bg-primaryDark dark:bg-secondaryButtonDark dark:border-secondaryDark border-2 -bottom-[13rem] md:-bottom-[10.4rem] -left-20 -right-20 rounded-md flex flex-col p-4 gap-y-3 before:content-[''] before:h-3 before:w-3 before:absolute before:bg-primaryDark  dark:before:bg-secondaryButtonDark before:left-1/2 before:-translate-x-1/2 before:-top-1 before:rotate-45 ">
                                <h5 className="text-center">Guest</h5>
                                <PrimaryButton className="flex justify-center hover:bg-primaryButtonDark">
                                    <Link
                                        href={route("login")}
                                        as="button"
                                        className="text-sm"
                                    >
                                        Login
                                    </Link>
                                </PrimaryButton>
                                <SecondaryButton className="flex justify-center hover:bg-secondaryButton">
                                    <Link
                                        href={route("register")}
                                        as="button"
                                        className="text-sm"
                                    >
                                        Register
                                    </Link>
                                </SecondaryButton>
                                <ChangeTheme className="flex w-fit self-center md:hidden" />
                            </section>
                        ) : null}
                    </div>
                    <button
                        className={`${
                            sidebarActive
                                ? "after:content-[''] after:absolute after:h-screen after:w-screen after:left-64 cursor-default"
                                : null
                        }`}
                        onClick={() => {
                            setSidebarActive((prev) => !prev);
                            if (sidebarActive == false) {
                                document.body.style.overflow = "hidden";
                            } else {
                                document.body.style.overflow = "auto";
                            }
                        }}
                    >
                        <GiHamburgerMenu className="cursor-pointer block md:hidden" />
                    </button>
                    <section
                        className={`fixed left-0 top-0 bg-primaryDark dark:bg-secondaryButtonDark pt-3 select-none h-screen ${
                            !sidebarActive ? "w-0" : "w-64"
                        } transition-all duration-500 shadow-2xl flex flex-col gap-y-11 overflow-hidden z-10`}
                    >
                        <header className="flex flex-row justify-center items-center gap-x-3">
                            <img
                                src={"/img/logo-himatekia.png"}
                                alt="logo himpunan"
                                width={30}
                            />
                            <span className="font-semibold">HIMATEKIA</span>
                        </header>
                        <ul>
                            <Link
                                onClick={() =>
                                    (document.body.style.overflow = "auto")
                                }
                                href={route("home")}
                            >
                                <li
                                    className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                        route().current("home")
                                            ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                            : null
                                    }`}
                                >
                                    Home
                                </li>
                            </Link>
                            <Link
                                onClick={() =>
                                    (document.body.style.overflow = "auto")
                                }
                                href={route("sejarahvisimisi")}
                            >
                                <li
                                    className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                        route().current("sejarahvisimisi")
                                            ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                            : null
                                    }`}
                                >
                                    Profil
                                </li>
                            </Link>
                            <Link
                                onClick={() =>
                                    (document.body.style.overflow = "auto")
                                }
                                href={route("kepengurusan")}
                            >
                                <li
                                    className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                        route().current("kepengurusan")
                                            ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                            : null
                                    }`}
                                >
                                    Kepengurusan
                                </li>
                            </Link>
                            <Link
                                onClick={() =>
                                    (document.body.style.overflow = "auto")
                                }
                                href={route("buku")}
                            >
                                <li
                                    className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                        route().current("buku")
                                            ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                            : null
                                    }`}
                                >
                                    Buku
                                </li>
                            </Link>
                            <Link
                                onClick={() =>
                                    (document.body.style.overflow = "auto")
                                }
                                href={route("store")}
                            >
                                <li
                                    className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                        route().current("store")
                                            ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                            : null
                                    }`}
                                >
                                    Store
                                </li>
                            </Link>
                        </ul>
                    </section>
                </div>
            </div>
        </nav>
    );
}
