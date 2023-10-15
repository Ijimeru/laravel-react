import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useAppSelector } from "@/store/store";
import GeneratePassword from "@/utils/GeneratePassword";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { BsFillDice6Fill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ChangeKontakReset({
    kontakreset,
}: {
    kontakreset: { content: string };
}) {
    const [editing, setEditing] = useState<boolean>(false);
    const { patch, setData, data } = useForm<{ content: string }>({
        content: kontakreset.content,
    });
    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6">
            <section className="flex flex-col">
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Kontak Reset
                    </h2>
                </div>
                <div
                    className={`text-primary rounded-lg overflow-hidden mt-4 min-h-[48px]`}
                >
                    {editing ? (
                        <input
                            type="text"
                            value={data.content}
                            placeholder={`Masukkan secret key`}
                            onChange={(e) => {
                                setData("content", e.target.value);
                            }}
                            className="rounded-lg h-8 w-full border dark:text-primaryDark border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
    focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                        />
                    ) : (
                        <p
                            className="dark:text-primaryDark text-primary sejarah"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    )}
                    <small>
                        <small className="text-red">*</small>
                        Gunakanlah kode negara di awal nomor, contoh
                        +62898XXXXXXX
                    </small>
                </div>
                <div className="flex flex-row gap-x-4">
                    <PrimaryButton
                        onClick={() => {
                            if (editing) {
                                patch("/change-settings/7", {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success(
                                            "Kontak reset berhasil di update!"
                                        );
                                    },
                                });

                                setEditing(false);
                            } else {
                                setEditing(true);
                            }
                        }}
                        className="w-1/12 flex justify-center mt-4"
                    >
                        {!editing ? `Edit` : `Save`}
                    </PrimaryButton>
                    {editing && (
                        <SecondaryButton
                            className="w-1/10 flex justify-center mt-4"
                            onClick={() => setEditing(false)}
                        >
                            Batalkan
                        </SecondaryButton>
                    )}
                </div>
            </section>
        </div>
    );
}
