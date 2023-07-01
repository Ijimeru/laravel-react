import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useAppSelector } from "@/store/store";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ChangeMisi({ misi }: { misi: { content: string } }) {
    const [editing, setEditing] = useState<boolean>(false);
    const { patch, setData, data } = useForm<{ content: string }>({
        content: misi.content,
    });
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6">
            <section className="flex flex-col">
                <div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Misi
                    </h2>
                </div>
                <div
                    className={`text-primary rounded-lg overflow-hidden mt-4 editor min-h-[48px] ${
                        mode == "light" ? "" : "dark"
                    }`}
                >
                    {editing ? (
                        <CKEditor
                            editor={ClassicEditor}
                            data={misi.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setData("content", data);
                            }}
                        />
                    ) : (
                        <p
                            className="dark:text-primaryDark text-primary sejarah"
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    )}
                </div>
                <div className="flex flex-row gap-x-4">
                    <PrimaryButton
                        onClick={() => {
                            if (editing) {
                                patch("/change-settings/3", {
                                    preserveScroll: true,
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
