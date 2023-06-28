import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function Index({auth}:PageProps){
    return (<AuthenticatedLayout 
    user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading- flex flex-row items-center gap-x-4">
    All Book <PrimaryButton>Add new
        </PrimaryButton>
    </h2>}>
    <div></div>

    </AuthenticatedLayout>)
}