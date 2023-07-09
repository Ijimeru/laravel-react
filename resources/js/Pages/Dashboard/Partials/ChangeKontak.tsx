import SecondaryButton from "@/Components/SecondaryButton";
import { content } from "@/types";
import CamelToTitle from "@/utils/CamelToTitle";
import { useForm } from "@inertiajs/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

interface kontak {
    [identitasWebsite: string]: string;
    telp: string;
    email: string;
    alamat: string;
    linkAlamat: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    youtubeLink: string;
}
export default function ChangeKontak({ kontak }: { kontak: content }) {
    const { patch, data, setData } = useForm<{ content: string }>({
        content: kontak.content,
    });
    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6">
            <section className="flex md:flex-row flex-col justify-center items-center text-center gap-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Informasi Kontak Website
                </h2>
            </section>
            <section>
                <div className="flex flex-col gap-y-4">
                    {Object.entries(JSON.parse(data.content) as kontak).map(
                        ([key, value]) => (
                            <Fragment key={key}>
                                <h2 className="text-base">
                                    {CamelToTitle(key)} :
                                </h2>
                                <input
                                    className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                            focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                                    value={value}
                                    onChange={(e) => {
                                        const datas = JSON.parse(
                                            data.content
                                        ) as kontak;
                                        datas[key] = e.target.value;
                                        setData(
                                            "content",
                                            JSON.stringify(datas)
                                        );
                                        // );
                                    }}
                                />
                            </Fragment>
                        )
                    )}
                    <div className="flex justify-center">
                        <SecondaryButton
                            className="flex justify-center w-24"
                            onClick={() => {
                                patch("/change-settings/5", {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        toast.success(
                                            "Informasi Kontak berhasil diubah"
                                        );
                                    },
                                });
                            }}
                        >
                            Save
                        </SecondaryButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
