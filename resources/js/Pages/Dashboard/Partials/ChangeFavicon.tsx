import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SecondaryButton from "@/Components/SecondaryButton";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "@inertiajs/react";
export default function ChangeFavicon() {
    const [src, setSrc] = useState<string>("/img/noimage.jpg");
    const { setData, post, errors } = useForm<{
        name: string | null;
        file: File | null;
    }>({
        name: "",
        file: null,
    });
    function ubahFavicon() {
        const response = new Promise((resolve, reject) =>
            post("/change-favicon", {
                preserveScroll: true,
                onSuccess: () => {
                    resolve("Berhasil diubah");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
                onError: () => {
                    reject("Gagal diubah");
                },
            })
        );
        toast.promise(response, {
            pending: {
                render() {
                    return <div>Mengubah...</div>;
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
    function fileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];
        if (file.type != "image/x-icon") {
            e.target.value = "";
            toast.error('Ekstensi Favicon harus dalam ".ico"');
            return;
        }
        // const target = e.target as typeof e.target & {
        //   previousSibling: { src: string | ArrayBuffer | null; style: React.CSSProperties };
        // };
        var img = new Image();
        var _URL = window.URL || window.webkitURL;
        var objectUrl = _URL.createObjectURL(file);
        img.onload = () => {
            _URL.revokeObjectURL(objectUrl);
        };
        img.src = objectUrl;
        const oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            setSrc(oFREvent.target!.result as string);
        };
        setData("name", e.target.value);
        setData("file", e.target.files![0]);
    }
    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6">
            <section className="flex md:flex-row flex-col justify-center items-center text-center gap-y-4">
                <div className="grow md:border-r w-1/2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Website Favicon
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        &middot; Favicon adalah ikon utama yang muncul pada
                        address bar suatu laman web dan merupakan logo dari
                        laman web tersebut
                    </p>
                    <div className="mt-4 flex justify-center w-full flex-col items-center">
                        <div className="w-fit">
                            <img src="/favicon.ico" width={200} />
                            <p className="text-center mt-3">
                                &middot; Gambar Favicon Saat Ini
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center grow w-1/2">
                    <form className="text-center flex flex-col justify-between h-full items-center gap-y-4">
                        <label htmlFor="fileFavicon">Upload Favicon Baru</label>
                        <img
                            src={src}
                            alt="favicon"
                            width={200}
                            className="rounded-md"
                        />
                        <input
                            type="file"
                            className="cursor-pointer dark:bg-slate-500 rounded-md bg-secondary border  max-w-[19rem]"
                            onChange={fileChange}
                        />
                    </form>
                </div>
            </section>
            <section className="flex items-center flex-col gap-y-4">
                <p className="text-sm text-red-600">{errors.file}</p>
                <SecondaryButton className="w-30 h-10">
                    <span className="text-lg" onClick={ubahFavicon}>
                        Ubah Favicon
                    </span>
                </SecondaryButton>
            </section>
        </div>
    );
}
