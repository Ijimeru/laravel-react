import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({
    auth,
    logo,
}: PageProps<{ logo: { content: string } }>) {
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading- flex flex-row items-center gap-x-4">
                    All Book <PrimaryButton>Add new</PrimaryButton>
                </h2>
            }
        >
            <Head title="Books" />
            <div></div>
        </AuthenticatedLayout>
    );
}
