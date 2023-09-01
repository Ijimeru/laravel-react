import DangerButton from "@/Components/DangerButton";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { BAN, BUANG, DELETE } from "@/Constant/Constant";
import { CommentType, ConstantType, User } from "@/types";
import CheckRole from "@/utils/CheckRole";
import { Link, router, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);

export default function Comment({
    datas,
    user,
}: {
    datas: CommentType;
    user: User;
}) {
    const { data, setData, errors, reset, clearErrors, patch } = useForm<{
        content: string;
    }>({ content: datas.content });
    function handleDelete(e: FormEvent) {
        e.preventDefault();
        const response = new Promise((resolve, reject) =>
            router.delete(route("comments.destroy", datas.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setShow(false);
                    resolve("Comment berhasil di hapus");
                },
                onError: () => {
                    setShow(false);
                    reject("Gagal menghapus comment");
                },
            })
        );
        toast.promise(response, {
            pending: {
                render() {
                    return <div>Saving...</div>;
                },
            },
            success: {
                render({ data }) {
                    return `${data}`;
                },
            },
            error: {
                render({ data }) {
                    return `${data}`;
                },
            },
        });
    }
    function handleBan(e: FormEvent) {
        e.preventDefault();
        const response = new Promise((resolve, reject) => {
            router.patch(
                route("users.update", datas.user.id),
                {
                    roles: [],
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setShow(false);
                        resolve("User sudah di ban");
                    },
                    onError: () => {
                        setShow(false);
                        reject("User gagal di ban");
                    },
                }
            );
        });
        toast.promise(response, {
            pending: {
                render() {
                    return <div>Saving...</div>;
                },
            },
            success: {
                render({ data }) {
                    return `${data}`;
                },
            },
            error: {
                render({ data }) {
                    return `${data}`;
                },
            },
        });
    }
    function submit(e: FormEvent) {
        e.preventDefault();
        const response = new Promise((resolve, reject) => {
            patch(route("comments.update", datas.id), {
                preserveScroll: true,
                onSuccess: () => {
                    resolve("Comment berhasil diubah");
                    setEditing(false);
                    clearErrors();
                },
                onError: () => {
                    reject("Comment gagal diubah");
                },
            });
        });
        toast.promise(response, {
            pending: {
                render() {
                    return <div>Saving...</div>;
                },
            },
            success: {
                render({ data }) {
                    return `${data}`;
                },
            },
            error: {
                render({ data }) {
                    return `${data}`;
                },
            },
        });
    }
    const [editing, setEditing] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [constant, setConstant] = useState<ConstantType>(BUANG);
    return (
        <div className="p-6 flex space-x-2 my-2 rounded-md dark:bg-secondaryButtonDark bg-primaryDark">
            {/* Same as */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="dark:text-primaryDark">
                            {datas.user.name}
                        </span>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(datas.created_at).fromNow()}
                        </small>
                        {datas.created_at !== datas.updated_at && (
                            <small className="text-sm text-gray-600">
                                {" "}
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {(datas.user.id === user?.id ||
                        CheckRole(user?.roles, "admin") ||
                        CheckRole(user?.roles, "super_admin")) && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {datas.user.id == user.id && (
                                    <button
                                        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out "
                                        onClick={() => {
                                            setData("content", datas.content);
                                            setEditing(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                )}

                                {(datas.user.id == user.id ||
                                    /* prettier-ignore */
                                    CheckRole(user.roles, "admin")) && (
                                    <button
                                        onClick={() => {
                                            setConstant(DELETE);
                                            setShow(true);
                                        }}
                                        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                )}
                                {CheckRole(user.roles, "super_admin") &&
                                    datas.user.roles && (
                                        <button
                                            onClick={() => {
                                                setConstant(BAN);
                                                setShow(true);
                                            }}
                                            className="block w-full px-4 py-2 text-left text-sm leading-5 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                                        >
                                            Ban
                                        </button>
                                    )}
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.content} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button
                                className="mt-4"
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="mt-4 text-lg dark:text-primaryDark">
                        {datas.content}
                    </p>
                )}
            </div>
            <Modal show={show} onClose={() => setShow(false)} maxWidth="sm">
                <form
                    className="p-6"
                    onSubmit={constant == DELETE ? handleDelete : handleBan}
                >
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                        {constant.text}
                    </h2>
                    <div className="mt-6 flex justify-center">
                        <SecondaryButton
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton className={`ml-3`}>
                            {constant.btext}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
