import { Link, usePage } from "@inertiajs/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import NavLink from "./NavLink";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import NavLinkMain from "./NavLinkMain";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
export const navList: {
    name: string;
    href?: string;
    commingsoon?: boolean;
    child?: {
        name: string;
        href?: string;
        child?: { name: string; href: string }[];
    }[];
}[] = [
    {
        name: "Beranda",
        href: "home",
    },
    {
        name: "Profil Himpunan",
        child: [
            {
                name: "Sejarah & Visi Misi",
                href: "sejarahvisimisi",
            },
            {
                name: "Struktur Organisasi",
                child: [
                    { name: "2021", href: "kepengurusan" },
                    { name: "2022", href: "kepengurusan" },
                    {
                        name: "2023",
                        href: "kepengurusan",
                    },
                ],
            },
        ],
    },
    {
        name: "Buku",
        href: "buku",
    },
    {
        name: "Berita",
        href: "berita",
        child: [
            {
                name: "Berita Himpunan",
                href: "home",
            },
            {
                name: "Berita Akademik",
                href: "home",
            },
        ],
    },
    {
        name: "Store",
        href: "store",
        commingsoon: true,
    },
];
export default function MainNavList() {
    const [activeNav, setActiveNav] = useState<string>("");
    const [activeChildNav, setActiveChildNav] = useState<string>("");
    return (
        <div className=" font-semibold">
            <ul className="flex-row gap-x-5 hidden md:flex">
                {navList.map((val, key) =>
                    val.href ? (
                        <div key={key}>
                            {val.commingsoon ? (
                                <div
                                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 cursor-pointer relative"
                                    onClick={() =>
                                        toast.warning("Coming Soon", {
                                            position: "top-center",
                                        })
                                    }
                                >
                                    {val.name}
                                </div>
                            ) : (
                                <NavLinkMain
                                    href={route(val.href)}
                                    active={route().current(val.href)}
                                    onMouseEnter={() => setActiveNav(val.name)}
                                    onMouseLeave={() => setActiveNav("")}
                                >
                                    {val.name}
                                    {val.child ? <RiArrowDropDownLine /> : null}
                                </NavLinkMain>
                            )}

                            <Transition
                                show={activeNav == val.name}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75 delay-200"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                {val.child ? (
                                    <ul
                                        className={`absolute bg-primaryDark top-2 dark:bg-secondaryButtonDark p-4 flex-col gap-4 w-44 border-t-2 cursor-default hover:opacity-100 flex`}
                                        onMouseEnter={() =>
                                            setActiveNav(val.name)
                                        }
                                        onMouseLeave={() => setActiveNav("")}
                                    >
                                        {val.child?.map((cval, ckey) => (
                                            <li key={ckey}>
                                                {cval.href ? (
                                                    <Link
                                                        href={route(cval.href)}
                                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 flex flex-row items-center"
                                                    >
                                                        {cval.name}
                                                        {cval.child ? (
                                                            <RiArrowDropDownLine />
                                                        ) : null}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 cursor-pointer flex flex-row items-center">
                                                        {cval.name}{" "}
                                                        {cval.child ? (
                                                            <RiArrowDropDownLine />
                                                        ) : null}
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </Transition>
                        </div>
                    ) : (
                        <div key={key}>
                            <div
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 cursor-pointer relative`}
                                onMouseEnter={() => setActiveNav(val.name)}
                                onMouseLeave={() => setActiveNav("")}
                            >
                                {val.name}
                                {val.child ? <RiArrowDropDownLine /> : null}
                            </div>
                            <Transition
                                show={activeNav == val.name}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75 delay-200"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                {val.child ? (
                                    <ul
                                        className={`absolute bg-primaryDark dark:bg-secondaryButtonDark p-4 flex flex-col gap-4 w-44 border-t-2 cursor-default top-2`}
                                        onMouseEnter={() =>
                                            setActiveNav(val.name)
                                        }
                                        onMouseLeave={() => setActiveNav("")}
                                    >
                                        {val.child?.map((cval, ckey) => (
                                            <li key={ckey}>
                                                {cval.href ? (
                                                    <Link
                                                        href={route(cval.href)}
                                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 flex flex-row items-center"
                                                    >
                                                        {cval.name}
                                                        {cval.child ? (
                                                            <RiArrowDropDownLine />
                                                        ) : null}
                                                    </Link>
                                                ) : (
                                                    <div>
                                                        <span
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 cursor-pointer flex flex-row items-center"
                                                            onMouseEnter={() =>
                                                                setActiveChildNav(
                                                                    cval.name
                                                                )
                                                            }
                                                            onMouseLeave={() =>
                                                                setActiveChildNav(
                                                                    ""
                                                                )
                                                            }
                                                        >
                                                            {cval.name}
                                                            {cval.child ? (
                                                                <RiArrowDropDownLine />
                                                            ) : null}
                                                        </span>
                                                        <Transition
                                                            show={
                                                                activeChildNav ==
                                                                cval.name
                                                            }
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75 delay-200"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            {cval.child ? (
                                                                <ul
                                                                    className={`absolute bg-primaryDark dark:bg-secondaryButtonDark p-4 flex flex-col gap-4 w-44 border-t-2 cursor-default -right-48 -top-3`}
                                                                    onMouseEnter={() =>
                                                                        setActiveChildNav(
                                                                            cval.name
                                                                        )
                                                                    }
                                                                    onMouseLeave={() =>
                                                                        setActiveChildNav(
                                                                            ""
                                                                        )
                                                                    }
                                                                >
                                                                    {cval.child?.map(
                                                                        (
                                                                            ccval,
                                                                            cckey
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    cckey
                                                                                }
                                                                            >
                                                                                <Link
                                                                                    href={route(
                                                                                        ccval.href,
                                                                                        {
                                                                                            name: ccval.name,
                                                                                        }
                                                                                    )}
                                                                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-700 dark:focus:text-gray-300 flex flex-row items-center"
                                                                                >
                                                                                    {
                                                                                        ccval.name
                                                                                    }
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            ) : null}
                                                        </Transition>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </Transition>
                        </div>
                    )
                )}
            </ul>
        </div>
    );
}
