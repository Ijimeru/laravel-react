import Main from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function Buku() {
    return (
        <Main>
            <Head title="Buku" />
            <section className="flex p-3 container m-auto h-64  mt-6">
                <div className="flex bg-secondaryButton rounded-xl justify-center items-center dark:bg-secondaryButtonDark w-full">
                    <h2 className="text-5xl">Semua Buku</h2>
                </div>
            </section>
        </Main>
    );
}
