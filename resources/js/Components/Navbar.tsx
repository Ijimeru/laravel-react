import { useWindowSize } from "@/hooks/useWindowSize";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { GiHamburgerMenu, VscAccount } from "react-icons/all";
import ChangeTheme from "./ChangeTheme";
import DangerButton from "./DangerButton";
import MainNavList from "./MainNavList";
import MobileMainNavList from "./MobileMainNavList";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import DriveLink from "@/utils/DriveLink";

export default function Navbar({
    logo,
    mauto,
}: {
    logo: { content: string };
    mauto?: boolean;
}) {
    const [account, setAccount] = useState<boolean>(false);
    const [sidebarActive, setSidebarActive] = useState<boolean>(false);
    const windowSize = useWindowSize();
    const page = usePage<PageProps>();
    const user = page.props.auth.user;

    useEffect(() => {
        if (windowSize.width! > 768) {
            setSidebarActive(false);
            document.body.style.overflow = "auto";
        }
    }, [windowSize.width]);
    return (
        <nav className="w-full h-fit bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark transition-all duration-1000 z-[11] sticky top-0">
            <div
                className={`${
                    mauto! ? "container mx-auto" : ""
                } flex flex-wrap items-center justify-between p-4`}
            >
                <Link href={route("home")}>
                    <img
                        src={DriveLink(logo.content)}
                        alt="logo"
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
                            user ? (
                                <section className="absolute h-fit bg-primaryDark dark:bg-secondaryButtonDark dark:border-secondaryDark border-2 -bottom-[16rem] md:-bottom-[13.8rem] -left-20 -right-20 rounded-md flex flex-col p-4 gap-y-3 before:content-[''] before:h-3 before:w-3 before:absolute before:bg-primaryDark  dark:before:bg-secondaryButtonDark before:left-1/2 before:-translate-x-1/2 before:-top-1 before:rotate-45 ">
                                    <h5 className="text-center">
                                        {user.name.length > 10
                                            ? user.name.slice(0, 10) + "..."
                                            : user.name}
                                    </h5>

                                    <PrimaryButton className="flex justify-center hover:bg-primaryButtonDark">
                                        <Link
                                            href={route("dashboard")}
                                            as="a"
                                            className="text-sm"
                                        >
                                            Dashboard
                                        </Link>
                                    </PrimaryButton>

                                    <SecondaryButton className="flex justify-center hover:bg-primaryButtonDark">
                                        <Link
                                            href={route("profile.edit")}
                                            as="div"
                                            className="text-sm"
                                            method="post"
                                        >
                                            Profil
                                        </Link>
                                    </SecondaryButton>
                                    <DangerButton className="flex justify-center hover:bg-primaryButtonDark">
                                        <Link
                                            href={route("logout")}
                                            as="div"
                                            className="text-sm"
                                            method="post"
                                        >
                                            logout
                                        </Link>
                                    </DangerButton>
                                    <ChangeTheme className="flex w-fit self-center md:hidden" />
                                </section>
                            ) : (
                                <section className="absolute h-fit bg-primaryDark dark:bg-secondaryButtonDark dark:border-secondaryDark border-2 -bottom-[13rem] md:-bottom-[10.4rem] -left-20 -right-20 rounded-md flex flex-col p-4 gap-y-3 before:content-[''] before:h-3 before:w-3 before:absolute before:bg-primaryDark  dark:before:bg-secondaryButtonDark before:left-1/2 before:-translate-x-1/2 before:-top-1 before:rotate-45 ">
                                    <h5 className="text-center">Guest</h5>
                                    <PrimaryButton className="flex justify-center hover:bg-primaryButtonDark">
                                        <Link
                                            href={route("login")}
                                            as="a"
                                            className="text-sm"
                                        >
                                            Login
                                        </Link>
                                    </PrimaryButton>
                                    <SecondaryButton className="flex justify-center hover:bg-secondaryButton">
                                        <Link
                                            href={route("register")}
                                            as="a"
                                            className="text-sm"
                                        >
                                            Register
                                        </Link>
                                    </SecondaryButton>
                                    <ChangeTheme className="flex w-fit self-center md:hidden" />
                                </section>
                            )
                        ) : null}
                    </div>
                    <button
                        className={`mr-6`}
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
                        } transition-all duration-500 shadow-2xl flex flex-col gap-y-11 overflow-x-hidden z-10`}
                    >
                        <header className="flex flex-row justify-center items-center gap-x-3">
                            <img
                                src={DriveLink(logo.content)}
                                alt="logo himpunan"
                                width={30}
                            />
                            <span className="font-semibold">HIMATEKIA</span>
                        </header>

                        <MobileMainNavList />
                    </section>
                </div>
            </div>
            <div
                className={`${
                    sidebarActive
                        ? "fixed top-0 h-screen w-screen cursor-default bg-slate-400 opacity-30"
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
            ></div>
        </nav>
    );
}
