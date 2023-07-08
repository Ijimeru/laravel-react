import ComponentDataGrid from "@/Components/ComponentDataGrid";
import Main from "@/Layouts/MainLayout";

import { ConstantType, PageProps, PostType } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsRecycle, BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlinePublish } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import {
    BUANG,
    DELETE,
    PUBLISH,
    RECYCLE,
    UNPUBLISH,
} from "@/Constant/PostConstant";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import { Button } from "@mui/material";
import PublishButton from "@/Components/PublishButton";
import { toast } from "react-toastify";
import SuccessButton from "@/Components/SuccessButton";
export default function Index({
    auth,
    posts,
    logo,
}: PageProps<{ posts: PostType[]; logo: { content: string } }>) {
    const [modalConstant, setModalConstant] = useState<ConstantType>(BUANG);
    const [show, setShow] = useState<boolean>(false);
    const [slug, setSlug] = useState<string>("");
    const [command, setCommand] = useState<string>("");
    const columns: GridColDef[] = [
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
                                onClick={() => {
                                    setModalConstant(PUBLISH);
                                    setSlug(params.row.slug);
                                    setCommand("publish");
                                    setShow(true);
                                }}
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
                                onClick={() => {
                                    setModalConstant(UNPUBLISH);
                                    setSlug(params.row.slug);
                                    setCommand("unpublish");
                                    setShow(true);
                                }}
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
                                onClick={() => {
                                    setModalConstant(RECYCLE);
                                    setSlug(params.row.slug);
                                    setCommand("recycle");
                                    setShow(true);
                                }}
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
                                onClick={() => {
                                    setModalConstant(DELETE);
                                    setSlug(params.row.slug);
                                    setCommand("delete");
                                    setShow(true);
                                }}
                                title="Delete Permanen"
                            />
                        ) : (
                            <BsTrash
                                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                                onClick={() => {
                                    setModalConstant(BUANG);
                                    setSlug(params.row.slug);
                                    setCommand("buang");
                                    setShow(true);
                                }}
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
                        <Link href={route("posts.edit", params.row.slug)}>
                            <FaRegEdit
                                className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
                                title="Edit"
                            />
                        </Link>
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
                    All Posts{" "}
                    <Link href={route("posts.create")} as="div">
                        <PrimaryButton>Add new</PrimaryButton>
                    </Link>
                </h2>
            }
        >
            <Head title="Posts" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {posts.length != 0 ? (
                    <ComponentDataGrid
                        data={posts}
                        columns={columns}
                        notcheckbox={true}
                    />
                ) : (
                    <p className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4 justify-center">
                        Tidak ada Post
                    </p>
                )}
            </div>
            <Modal
                show={show}
                onClose={() => {
                    setShow(false);
                }}
            >
                <form className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                        {modalConstant.text}
                    </h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />
                    </div>

                    <div className="mt-6 flex flex-row justify-center gap-x-4">
                        <SecondaryButton
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Cancel
                        </SecondaryButton>
                        {modalConstant.type == "danger" ? (
                            command == "buang" ? (
                                <Link
                                    as="div"
                                    href={`posts/${slug}`}
                                    method="patch"
                                    onSuccess={() => {
                                        setShow(false);
                                        toast.success("Post berhasil dibuang");
                                    }}
                                    data={{ status: "trash" }}
                                >
                                    <DangerButton>
                                        {modalConstant.btext}
                                    </DangerButton>
                                </Link>
                            ) : command == "unpublish" ? (
                                <Link
                                    as="div"
                                    href={`posts/${slug}`}
                                    method="patch"
                                    onSuccess={() => {
                                        setShow(false);
                                        toast.success(
                                            "Post berhasil dibatalkan publikasinya"
                                        );
                                    }}
                                    data={{ status: "draft" }}
                                >
                                    <DangerButton>
                                        {modalConstant.btext}
                                    </DangerButton>
                                </Link>
                            ) : (
                                <Link
                                    as="div"
                                    href={route("posts.destroy", slug)}
                                    method="delete"
                                    onSuccess={() => {
                                        setShow(false);
                                        toast.success(
                                            "Post berhasil dihapus permanen"
                                        );
                                    }}
                                >
                                    <DangerButton>
                                        {modalConstant.btext}
                                    </DangerButton>
                                </Link>
                            )
                        ) : modalConstant.type == "success" ? (
                            <Link
                                as="div"
                                href={`posts/${slug}`}
                                method="patch"
                                onSuccess={() => {
                                    setShow(false);
                                    toast.success("Post berhasil kembalikan");
                                }}
                                data={{ status: "draft" }}
                            >
                                <SuccessButton>
                                    {modalConstant.btext}
                                </SuccessButton>
                            </Link>
                        ) : (
                            <Link
                                as="div"
                                href={`posts/${slug}`}
                                method="patch"
                                onSuccess={() => {
                                    setShow(false);
                                    toast.success("Post berhasil dipublikasi");
                                }}
                                data={{ status: "published" }}
                            >
                                <PublishButton>
                                    {modalConstant.btext}
                                </PublishButton>
                            </Link>
                        )}
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
