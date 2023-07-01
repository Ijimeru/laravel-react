import Main from "@/Layouts/MainLayout";
import { content } from "@/types";
import { Head } from "@inertiajs/react";

export default function Kepengurusan({
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
            <Head title="Kepengurusan" />
            Kepengurusan
        </Main>
    );
}
