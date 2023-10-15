import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

import "react-toastify/ReactToastify.css";

export default function Tutorial({
    auth,
    logo,
}: PageProps<{ logo: { content: string } }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            logo={logo}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Tutorial upload image/file
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <ol className="list-decimal">
                                <li>
                                    <p>
                                        Buka gdrive anda dan pilih directory
                                        manapun
                                    </p>
                                    <img
                                        src="/image-tutorial/1.png"
                                        alt="image-tutorial"
                                    />
                                </li>
                                <li>
                                    <p>
                                        Upload file/image yang ingin di upload
                                    </p>
                                    <img
                                        src="/image-tutorial/2.png"
                                        alt="image-tutorial"
                                    />
                                </li>
                                <li>
                                    <p>
                                        Klik kanan file tersebut lalu share,
                                        setelah itu ubah permission menjadi
                                        anyone can access, dan copy link
                                        tersebut.
                                    </p>
                                    <img
                                        src="/image-tutorial/3.png"
                                        alt="image-tutorial"
                                    />
                                </li>
                                <li>
                                    <p>
                                        Copy url pada input box file yang mau
                                        diupload pada website
                                    </p>
                                    <img
                                        src="/image-tutorial/4.png"
                                        alt="image-tutorial"
                                    />
                                </li>
                                <li>
                                    <p>Tutorial selesai!</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
