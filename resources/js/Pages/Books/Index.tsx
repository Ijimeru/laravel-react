import ComponentDataGrid from "@/Components/ComponentDataGrid";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { DELETE } from "@/Constant/Constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BookType, PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export default function Index({
    auth,
    logo,
    books,
}: PageProps<{ logo: { content: string }; books: BookType[] }>) {
    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", minWidth: 70, width: 240 },
        { field: "tahun", headerName: "Tahun", minWidth: 70, width: 120 },
        {
            field: "author",
            headerName: "Author",
            minWidth: 130,
            width: 120,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            maxWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="flex flex-row gap-x-1">
                        <MdDeleteForever
                            className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                            onClick={() => {
                                setId(params.id);
                                setType("delete");
                                setShow(true);
                            }}
                            title="Delete Buku"
                        />
                        <AiOutlineEye
                            className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
                            onClick={() => {
                                setId(params.id);
                                setType("show");
                                setShow(true);
                            }}
                            title="View Post"
                        />
                        <Link href={route("books.edit", params.id)}>
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
    const [show, setShow] = useState<boolean>(false);
    const [id, setId] = useState<number | string>(
        books.length > 0 ? books[0].id : 1
    );
    const [type, setType] = useState<string>("");
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4">
                    All Book{" "}
                    <Link href={route("books.create")} as="div">
                        <PrimaryButton>Add new</PrimaryButton>
                    </Link>
                </h2>
            }
        >
            <Head title="Books" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {books.length != 0 ? (
                    <ComponentDataGrid
                        data={books}
                        columns={columns}
                        notcheckbox={true}
                    />
                ) : (
                    <p className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4 justify-center">
                        Tidak ada Buku
                    </p>
                )}
            </div>
            {books.length != 0 ? (
                <Modal
                    maxWidth={type == "delete" ? "sm" : "md"}
                    show={show}
                    onClose={() => {
                        setShow(false);
                    }}
                >
                    {type == "delete" ? (
                        <form className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                                {DELETE.text}
                            </h2>

                            <div className="mt-6">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="sr-only"
                                />
                            </div>

                            <div className="mt-6 flex justify-center">
                                <SecondaryButton
                                    onClick={() => {
                                        setShow(false);
                                    }}
                                >
                                    Cancel
                                </SecondaryButton>

                                <Link
                                    className={`ml-3`}
                                    href={route("books.destroy", id!)}
                                    as="div"
                                    method="delete"
                                    onSuccess={() => {
                                        setShow(false);
                                        toast.success("Buku berhasil dihapus");
                                    }}
                                >
                                    <DangerButton>{DELETE.btext}</DangerButton>
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="p-6 flex gap-y-3 flex-col items-center">
                            <button
                                className="self-start text-xl"
                                onClick={() => setShow(false)}
                            >
                                x
                            </button>
                            <h2 className="text-3xl">Book Information</h2>
                            <img
                                src={`/storage/${
                                    books.filter((book) => book.id == id)[0]
                                        .cover
                                }`}
                                alt=""
                                width={150}
                                className="rounded-md"
                            />
                            <div>
                                <p>
                                    Judul :{" "}
                                    {
                                        books.filter((book) => book.id == id)[0]
                                            .title
                                    }
                                </p>
                                <p>
                                    Tahun :{" "}
                                    {
                                        books.filter((book) => book.id == id)[0]
                                            .tahun
                                    }
                                </p>
                                {books.filter((book) => book.id == id)[0]
                                    .penerbit && (
                                    <p>
                                        Penerbit :{" "}
                                        {
                                            books.filter(
                                                (book) => book.id == id
                                            )[0].penerbit
                                        }
                                    </p>
                                )}

                                <p>
                                    Author :{" "}
                                    {
                                        books.filter((book) => book.id == id)[0]
                                            .author
                                    }
                                </p>
                                <p>
                                    Kategori :{" "}
                                    {books
                                        .filter((book) => book.id == id)[0]
                                        .categories.map(
                                            (category, index, { length }) =>
                                                index == length - 1 ? (
                                                    <span>{category.name}</span>
                                                ) : (
                                                    <span>
                                                        {category.name + " , "}
                                                    </span>
                                                )
                                        )}
                                </p>
                                <div className="mt-4 flex flex-row gap-x-3 justify-center">
                                    <SecondaryButton>
                                        <a
                                            href={`/storage/${
                                                books.filter(
                                                    (book) => book.id == id
                                                )[0].file
                                            }`}
                                            download={
                                                books.filter(
                                                    (book) => book.id == id
                                                )[0].title + ".pdf"
                                            }
                                        >
                                            Download
                                        </a>
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <a
                                            href={`/storage/${
                                                books.filter(
                                                    (book) => book.id == id
                                                )[0].file
                                            }`}
                                            target="_blank"
                                        >
                                            Read Online
                                        </a>
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            ) : null}
        </AuthenticatedLayout>
    );
}
