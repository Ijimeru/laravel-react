import ComponentDataGrid from "@/Components/ComponentDataGrid";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BookType, PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AiOutlineEye } from "react-icons/ai";
import { BsRecycle, BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePublish, MdDeleteForever } from "react-icons/md";

export default function Index({
    auth,
    logo,
    book,
}: PageProps<{ logo: { content: string }; book: BookType[] }>) {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "title", headerName: "Title", minWidth: 130, width: 320 },
        {
            field: "author",
            headerName: "Author",
            minWidth: 130,
            valueGetter: (params) => params.value.name,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            renderCell: (params: GridRenderCellParams) => {
                if (params.value == "draft") {
                    return (
                        <div className="flex flex-row gap-x-2 items-center justify-between">
                            <MdOutlinePublish
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(81,35,232)] overflow-visible cursor-pointer"
                                title="Publish to public"
                                onClick={() => {}}
                            />
                            <span className="capitalize inline-block">
                                {params.value}
                            </span>
                        </div>
                    );
                } else if (params.value == "published") {
                    return (
                        <div className="flex flex-row gap-x-2 items-center justify-between">
                            <MdOutlinePublish
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer rotate-180"
                                title="Unpublish"
                                onClick={() => {}}
                            />
                            <span className="capitalize inline-block">
                                {params.value}
                            </span>
                        </div>
                    );
                } else if (params.value == "trash") {
                    return (
                        <div className="flex flex-row gap-x-2 items-center justify-between">
                            <BsRecycle
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(14,192,67)] overflow-visible cursor-pointer rotate-180"
                                title="Make to draft"
                                onClick={() => {}}
                            />
                            <span className="capitalize inline-block">
                                {params.value}
                            </span>
                        </div>
                    );
                }
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="flex flex-row gap-x-1">
                        {params.row.status == "trash" ? (
                            <MdDeleteForever
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                                onClick={() => {}}
                                title="Delete Permanen"
                            />
                        ) : (
                            <BsTrash
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                                onClick={() => {}}
                                title="Masukkan ke kotak sampah"
                            />
                        )}
                        <AiOutlineEye
                            className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
                            onClick={() =>
                                router.get(
                                    route("posts.view", { id: params.id })
                                )
                            }
                            title="View Post"
                        />
                        <FaRegEdit
                            className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
                            title="Edit"
                        />
                    </div>
                );
            },
        },
    ];
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
            <div className="text-gray-800 dark:text-gray-200 leading- flex flex-row items-center gap-x-4">
                <ComponentDataGrid data={book} columns={columns} />
            </div>
        </AuthenticatedLayout>
    );
}
