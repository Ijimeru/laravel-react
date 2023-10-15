import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SecondaryButton from "@/Components/SecondaryButton";
import "react-toastify/dist/ReactToastify.css";
import { Link, useForm } from "@inertiajs/react";
import DriveLink from "@/utils/DriveLink";
import GetLinkId from "@/utils/GetLinkId";
export default function ChangeLogo({ logo }: { logo: { content: string } }) {
    const [src, setSrc] = useState<string>("/img/noimage.jpg");
    const { setData, post, errors, data } = useForm<{
        file: string;
    }>({
        file: "",
    });
    function ubahLogo() {
        const response = new Promise((resolve, reject) =>
            post("/change-logo", {
                preserveScroll: true,
                onSuccess: () => {
                    setSrc("/img/noimage.jpg");
                    resolve("Berhasil diubah");
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

    return (
        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col gap-y-6">
            <section className="flex md:flex-row flex-col justify-center items-center text-center gap-y-4">
                <div className="grow md:border-r w-1/2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Logo Website
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        &middot; Logo website merupakan identitas logo untuk
                        website
                    </p>
                    <div className="mt-4 flex justify-center w-full flex-col items-center">
                        <div className="w-fit">
                            <img
                                src={DriveLink(logo.content)}
                                width={200}
                                alt="logo"
                                title="logo"
                                className="rounded-md"
                            />
                            <p className="text-center mt-3">
                                &middot; Gambar Logo Saat Ini
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center grow w-1/2">
                    <form className="text-center flex flex-col justify-between h-full items-center gap-y-4">
                        <label htmlFor="fileFavicon">Upload Logo Baru</label>
                        <img
                            src={src}
                            alt="favicon"
                            width={200}
                            className="rounded-md"
                        />
                        <input
                            type="text"
                            value={data.file}
                            placeholder={`Masukkan link drive untuk file logo`}
                            onChange={(e) => {
                                setData("file", e.target.value);
                                if (e.target.value.length !== 0) {
                                    setSrc(
                                        DriveLink(GetLinkId(e.target?.value)!)
                                    );
                                } else {
                                    setSrc("/img/noimage.jpg");
                                }
                            }}
                            className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                                    focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                        />
                        <small className="text-sm">
                            Tutorial upload image menggunakan link drive,{" "}
                            <Link
                                href={route("tutorial")}
                                className="underline hover:text-blue-600"
                            >
                                Klik di sini
                            </Link>
                        </small>
                    </form>
                </div>
            </section>
            <section className="flex items-center flex-col gap-y-4">
                <p className="text-sm text-red-600">{errors.file}</p>
                <SecondaryButton className="w-30 h-10">
                    <span className="text-lg" onClick={ubahLogo}>
                        Ubah Logo
                    </span>
                </SecondaryButton>
            </section>
        </div>
    );
}
