import MainFooter from "@/Components/MainFooter";
import MyToastContainer from "@/Components/MyToastContainer";
import Navbar from "@/Components/Navbar";
import { store } from "@/store/store";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { HTMLAttributes, useEffect } from "react";
import { Provider } from "react-redux";
import { toast } from "react-toastify";

interface content {
    content: string;
}

export default function Main({
    children,
    logo,
    visi,
    kontak,
}: HTMLAttributes<HTMLDivElement> & {
    logo: content;
    visi?: content;
    kontak?: content;
}) {
    const page = usePage<PageProps>();
    useEffect(() => {
        if (localStorage.getItem("mode")) {
            document.body.classList.add(localStorage.getItem("mode")!);
        } else {
            localStorage.setItem("mode", "light");
        }
        if (page.props.flash.message) {
            if (page.props.flash.type == "success") {
                toast.success(page.props.flash.message);
            } else if (page.props.flash.type == "warning") {
                toast.warning(page.props.flash.message);
            }
        }
        document.body.style.width = "auto";
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
                <MainFooter visi={visi!} logo={logo} kontak={kontak!} />
            </div>
        </Provider>
    );
}
