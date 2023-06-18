import { Link } from "@inertiajs/react";
import { navList } from "./MainNavList";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
export default function MobileMainNavList() {
    const [activeNav, setActiveNav] = useState<string>();
    const [activeCNav, setActiveCNav] = useState<string>();
    return (
        <ul>
            {navList.map((nav, key) =>
                nav.href ? (
                    <Link
                        onClick={() => (document.body.style.overflow = "auto")}
                        href={route(nav.href)}
                        key={key}
                    >
                        <li
                            className={`p-4 border hover:bg-primaryButton hover:bg-opacity-40 hover:shadow-lg ${
                                route().current(nav.href)
                                    ? "bg-primaryButton bg-opacity-20 shadow-lg"
                                    : null
                            }`}
                        >
                            {nav.name}
                        </li>
                    </Link>
                ) : (
                    <div key={key}>
                        <li
                            className={`p-4 border  hover:bg-opacity-40 hover:shadow-lg flex flex-row justify-between items-center`}
                        >
                            {nav.name}
                            <AiOutlinePlus
                                className="cursor-pointer rounded-full hover:bg-primaryButton hover:bg-opacity-20 text-3xl p-1 transition-all duration-300"
                                onClick={() =>
                                    activeNav != nav.name
                                        ? setActiveNav(nav.name)
                                        : setActiveNav("")
                                }
                            />
                        </li>
                        {activeNav == nav.name ? (
                            <ul className="ml-7">
                                {nav.child?.map((cnav, ckey) =>
                                    cnav.href ? (
                                        <Link
                                            href={route(cnav.href)}
                                            key={ckey}
                                        >
                                            <li>{cnav.name}</li>
                                        </Link>
                                    ) : (
                                        <div>
                                            <li className="flex flex-row justify-between items-center pr-5">
                                                {cnav.name}
                                                <AiOutlinePlus
                                                    className="cursor-pointer rounded-full hover:bg-primaryButton hover:bg-opacity-20 text-2xl p-1 transition-all duration-300"
                                                    onClick={() =>
                                                        activeCNav != cnav.name
                                                            ? setActiveCNav(
                                                                  cnav.name
                                                              )
                                                            : setActiveCNav("")
                                                    }
                                                />
                                            </li>
                                            {activeCNav == cnav.name ? (
                                                <ul className="ml-4">
                                                    {cnav.child?.map(
                                                        (ccnav, cckey) => (
                                                            <Link
                                                                href={route(
                                                                    ccnav.href
                                                                )}
                                                                key={cckey}
                                                            >
                                                                <li>
                                                                    {ccnav.name}
                                                                </li>
                                                            </Link>
                                                        )
                                                    )}
                                                </ul>
                                            ) : null}
                                        </div>
                                    )
                                )}
                            </ul>
                        ) : null}
                    </div>
                )
            )}
        </ul>
    );
}
