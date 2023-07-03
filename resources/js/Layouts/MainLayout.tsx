import MainFooter from "@/Components/MainFooter";
import MyToastContainer from "@/Components/MyToastContainer";
import Navbar from "@/Components/Navbar";
import { store } from "@/store/store";
import { HTMLAttributes, useEffect } from "react";
import { Provider } from "react-redux";

interface content {
    content: string;
}

export default function Main({
    children,
    logo,
    visi,
    kontak,
    mauto,
    ...props
}: HTMLAttributes<HTMLDivElement> & {
    logo: content;
    mauto?: boolean;
    visi: content;
    kontak: content;
}) {
    useEffect(() => {
        if (localStorage.getItem("mode")) {
            document.body.classList.add(localStorage.getItem("mode")!);
        } else {
            localStorage.setItem("mode", "light");
        }
    }, []);
    return (
        <Provider store={store}>
            <div
                className={`flex justify-between flex-col bg-secondary dark:bg-secondaryDark text-primary dark:text-primaryDark scroll-smooth`}
            >
                <MyToastContainer />
                <Navbar logo={logo} />
                <div className="min-h-[calc(100vh-72px-410px)]">{children}</div>

                <br />
                <MainFooter visi={visi} logo={logo} kontak={kontak} />
            </div>
        </Provider>
    );
}
