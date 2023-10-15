import { PageProps, User, content } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ComponentDataGrid from "@/Components/ComponentDataGrid";
import { Link, Head, useForm } from "@inertiajs/react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import TransferList from "@/Components/TransferList";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import ItemNotInList from "@/utils/ItemNotInList";
import { toast } from "react-toastify";
import Add from "./Partials/Add";

export default function Index({
    auth,
    logo,
    users,
    roles,
}: PageProps<{ logo: content; users: User[]; roles: { role: string }[] }>) {
    const { patch, setData } = useForm<{ roles: string[] }>({
        roles: [],
    });
    function handleSubmit(): void {
        patch(route("users.update", id), {
            onSuccess: () => {
                setShow(false);
                toast.success("Role berhasil diganti");
            },
        });
    }
    const [id, setId] = useState<string>("1");
    const [show, setShow] = useState<boolean>(false);
    const [left, setLeft] = useState<string[]>([]);
    const [right, setRight] = useState<string[]>([]);
    useEffect(() => {
        setData("roles", right);
    }, [right]);
    const columns: GridColDef[] = [
        { field: "name", headerName: "Nama", minWidth: 70, width: 250 },
        {
            field: "roles",
            headerName: "Role",
            minWidth: 130,
            width: 320,
            valueGetter: (params) => {
                return params.value.map((val: { role: string }) => val.role);
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            maxWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className="flex flex-row gap-x-1">
                        <PrimaryButton
                            onClick={() => {
                                let right: string[] = params.row.roles.map(
                                    (val: { role: string }) => val.role
                                );
                                setRight(right);
                                setLeft(
                                    ItemNotInList(
                                        right,
                                        roles.map((role) => role.role)
                                    )
                                );
                                setId(params.id.toString());
                                setType("role");
                                setShow(true);
                            }}
                        >
                            Ganti Role
                        </PrimaryButton>
                    </div>
                );
            },
        },
    ];
    const [type, setType] = useState<string>("role");
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight flex flex-row gap-x-4 items-center">
                    Role Management System
                    <PrimaryButton
                        onClick={() => {
                            setType("add");
                            setShow(true);
                        }}
                    >
                        Add new
                    </PrimaryButton>
                </h2>
            }
        >
            <Head title="Role Management System" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {users.length != 0 ? (
                    <ComponentDataGrid
                        data={users.filter((user) => user.id != auth.user.id)}
                        columns={columns}
                        notcheckbox={true}
                    />
                ) : (
                    <p className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4 justify-center">
                        Tidak ada User
                    </p>
                )}
            </div>

            <Modal show={show} onClose={() => setShow(false)}>
                {type == "role" ? (
                    <div className="flex flex-col items-center p-4">
                        <h2 className="mb-8 text-center text-3xl">Ubah Role</h2>
                        <TransferList
                            left={left}
                            setLeft={setLeft}
                            right={right}
                            setRight={setRight}
                        />
                        <SecondaryButton
                            className="mt-6"
                            onClick={handleSubmit}
                        >
                            Ubah
                        </SecondaryButton>
                    </div>
                ) : (
                    <Add setShow={setShow} />
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
