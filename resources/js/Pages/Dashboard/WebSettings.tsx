import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

export default function WebSettings({auth}:PageProps){
    return <AuthenticatedLayout user={auth.user}>
        gege
    </AuthenticatedLayout>
}