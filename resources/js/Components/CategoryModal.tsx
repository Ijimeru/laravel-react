import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "./Modal";
import { useForm } from "@inertiajs/react";
import { Input } from "@mui/material";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";
import SuccessButton from "./SuccessButton";
import { toast } from "react-toastify";
import { useAppSelector } from "@/store/store";
import SelectComponent from "./SelectComponent";
import { CategoryType } from "@/types";
import ToCapitalCase from "@/utils/ToCapitalCase";

export default function CategoryModal({
    show,
    setShow,
    setSelectedOptions,
    type,
    method,
    categories,
}: {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    type: string;
    method: string;
    categories?: CategoryType[];
    setSelectedOptions?: Dispatch<SetStateAction<string[]>>;
}) {
    const {
        post,
        setData,
        data,
        errors,
        clearErrors,
        delete: destroy,
    } = useForm<{
        name: string;
        meta_category_id: number;
    }>({
        name: "",
        meta_category_id: type == "Post" ? 1 : 2,
    });
    const [error, setError] = useState<string>("");
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (method == "post") {
            post(route("categories.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Category berhasil dibuat");
                    setCategory("");
                    setData("name", "");
                    setShow(false);
                },
            });
        } else {
            if (category == "") {
                setError("Category wajib diisi");
                return;
            }
            destroy(route("categories.destroy", category), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Category berhasil dihapus");
                    setSelectedOptions &&
                        setSelectedOptions((prev) =>
                            prev.filter(
                                (p) =>
                                    p !=
                                    categories?.filter(
                                        (cat) => cat.id == parseInt(category)
                                    )[0].name
                            )
                        );
                    setCategory("");
                    setShow(false);
                },
            });
        }
    }
    const mode = useAppSelector((state) => state.mode.mode);
    const [category, setCategory] = useState<string>("");
    return (
        <Modal show={show} onClose={() => setShow(false)} maxWidth="sm">
            <form className="p-4 flex flex-col gap-y-4" onSubmit={handleSubmit}>
                {method == "post" ? (
                    <h2 className="text-center">Add Category</h2>
                ) : (
                    <h2 className="text-center">Delete Category</h2>
                )}
                {method == "post" ? (
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        sx={{ color: mode == "dark" ? "white" : "black" }}
                    />
                ) : (
                    <SelectComponent
                        label="Categories"
                        option={categories!.map((category) => category.name)}
                        value={categories!.map((category) => category.id)}
                        data={category}
                        setState={setCategory}
                    />
                )}

                <p className="text-red-600 text-sm">
                    {ToCapitalCase(error ? error : errors.name)}
                </p>
                <div className="flex flex-row gap-x-3 self-center">
                    <SecondaryButton
                        onClick={() => {
                            setError("");
                            clearErrors();
                            setShow(false);
                        }}
                        type="button"
                    >
                        Batal
                    </SecondaryButton>
                    {method == "post" ? (
                        <SuccessButton type="submit">Tambah</SuccessButton>
                    ) : (
                        <DangerButton type="submit">Delete</DangerButton>
                    )}
                </div>
            </form>
        </Modal>
    );
}
