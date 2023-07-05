import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import ChangeFavicon from "./Partials/ChangeFavicon";
import ChangeSejarah from "./Partials/ChangeSejarah";
import ChangeVisi from "./Partials/ChangeVisi";
import ChangeMisi from "./Partials/ChangeMisi";
import ChangeLogo from "./Partials/ChangeLogo";
import ChangeKontak from "./Partials/ChangeKontak";
import ChangeTheme from "@/Components/ChangeTheme";

interface content {
    content: string;
}
export default function WebSettings({
    auth,
    sejarah,
    visi,
    misi,
    logo,
    kontak,
}: PageProps<{
    sejarah: content;
    visi: content;
    misi: content;
    logo: content;
    kontak: content;
}>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            logo={logo}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading- flex flex-row items-center gap-x-4">
                    All Web Settings
                </h2>
            }
        >
            <Head title="Web Settings" />
            <div className="py-12 text-primary dark:text-primaryDark">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <ChangeFavicon />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6 mt-3 items-center">
                        <ChangeTheme className="flex w-fit" />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-3">
                    <ChangeSejarah sejarah={sejarah} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-3">
                    <ChangeVisi visi={visi} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-3">
                    <ChangeMisi misi={misi} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-3">
                    <ChangeLogo logo={logo} />
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 mt-3">
                    <ChangeKontak kontak={kontak} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
