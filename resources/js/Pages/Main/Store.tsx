import Main from "@/Layouts/MainLayout";
import { content } from "@/types";
import { Head } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Store({
    logo,
    visi,
    kontak,
}: {
    logo: content;
    visi: content;
    kontak: content;
}) {
    return (
        <Main logo={logo} visi={visi} kontak={kontak}>
            <Head title="Store" />
            <button
                onClick={() =>
                    toast.warning("Fitur Belum tersedia", {
                        position: "top-center",
                    })
                }
            >
                Gege
            </button>
        </Main>
    );
}
