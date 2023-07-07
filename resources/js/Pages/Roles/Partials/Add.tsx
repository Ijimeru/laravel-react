import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import ToCapitalCase from "@/utils/ToCapitalCase";
import { useForm } from "@inertiajs/react";
import { Input } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";

export default function Add({
    setShow,
}: {
    setShow: Dispatch<SetStateAction<boolean>>;
}) {
    const { post, setData, data, errors, processing } = useForm<{
        role: string;
    }>({
        role: "",
    });
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post(route("roles.store"), {
            onSuccess: () => {
                setShow(false);
                toast.success("Role berhasil ditambahkan");
            },
        });
    }
    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="mb-8 text-center text-3xl">Tambah Role</h2>
            <div className="flex flex-col items-start w-full">
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-y-4"
                >
                    <InputLabel style={{ fontSize: 24 }}>Nama Role</InputLabel>
                    <Input
                        type="text"
                        fullWidth
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                    />
                    <p className="text-red-600 text-sm ">
                        {ToCapitalCase(errors.role)}
                    </p>
                    <SecondaryButton
                        className={`self-center ${
                            processing ? "cursor-wait" : ""
                        }`}
                        type="submit"
                    >
                        Tambah
                    </SecondaryButton>
                </form>
            </div>
        </div>
    );
}
