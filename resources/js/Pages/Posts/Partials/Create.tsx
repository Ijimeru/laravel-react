import CategoryModal from "@/Components/CategoryModal";
import DashboardCheckbox from "@/Components/DashboardCheckbox";
import Editor from "@/Components/Editor";
import PublishButton from "@/Components/PublishButton";
import SuccessButton from "@/Components/SuccessButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CategoryType, PageProps, content } from "@/types";
import CamelToTitle from "@/utils/CamelToTitle";
import DriveLink from "@/utils/DriveLink";
import DriveLinkThumbnail from "@/utils/DriveLinkThumbnail";
import GetLinkId from "@/utils/GetLinkId";
import ToCapitalCase from "@/utils/ToCapitalCase";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

export default function Create({
    logo,
    auth,
    categories,
}: PageProps<{ logo: content; categories: CategoryType[] }>) {
    interface PostType {
        title: string;
        image: string;
        categories: string[];
        body: string;
        status: string;
        [key: string]: unknown;
    }
    const { data, setData, post, errors } = useForm<PostType>({
        title: "",
        image: "",
        categories: [],
        body: "",
        status: "",
    });
    const [src, setSrc] = useState<string>("/img/noimage.jpg");
    const [source] = useDebounce<string>(src, 100);

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        post(route("posts.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Post berhasil ditambahkan");
            },
        });
    };
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    useEffect(() => {
        setData("categories", selectedOptions);
    }, [selectedOptions]);
    const [show, setShow] = useState<boolean>(false);
    const [method, setMethod] = useState<string>("");

    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4">
                    Create Post
                </h2>
            }
        >
            <Head title="Create Post" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                            <Link
                                href={route("posts.index")}
                                className="text-2xl ml-3 hover:text-red-600"
                            >
                                &larr;
                            </Link>
                            <header className="w-full text-center mt-3 text-2xl font-semibold">
                                Enter Post Information
                            </header>

                            {Object.entries(data as PostType).map(
                                ([key, value]) =>
                                    key == "status" ? (
                                        <></>
                                    ) : (
                                        <div
                                            className="flex flex-col mt-4 p-4 gap-y-4"
                                            key={key}
                                        >
                                            <label
                                                htmlFor={key}
                                                className="text-lg font-semibold"
                                            >
                                                {CamelToTitle(key)}{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </label>

                                            {key == "categories" ? (
                                                <>
                                                    <p className="text-sm text-red-600">
                                                        {ToCapitalCase(
                                                            errors[key]
                                                        )}
                                                    </p>
                                                    <div className="flex flex-row items-center">
                                                        <DashboardCheckbox
                                                            data={categories.map(
                                                                (category) =>
                                                                    category.name
                                                            )}
                                                            setSelectedOptions={
                                                                setSelectedOptions
                                                            }
                                                            selectedOptions={
                                                                selectedOptions
                                                            }
                                                        />
                                                        <div
                                                            className="rounded-full p-4 text-3xl cursor-pointer"
                                                            onClick={() => {
                                                                setMethod(
                                                                    "post"
                                                                );
                                                                setShow(true);
                                                            }}
                                                        >
                                                            +
                                                        </div>
                                                        <div
                                                            className="rounded-full p-4 text-3xl cursor-pointer"
                                                            onClick={() => {
                                                                setMethod(
                                                                    "delete"
                                                                );
                                                                setShow(true);
                                                            }}
                                                        >
                                                            -
                                                        </div>
                                                    </div>
                                                </>
                                            ) : key == "image" ? (
                                                <div
                                                    className="flex flex-col items-center gap-y-3"
                                                    key={key}
                                                >
                                                    <img
                                                        src={source}
                                                        alt="Hero Image"
                                                        width={200}
                                                        className="rounded-md shadow-md"
                                                    />

                                                    <p className="text-sm text-red-600">
                                                        {ToCapitalCase(
                                                            errors[key]
                                                        )}
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={value as string}
                                                        placeholder={`Masukkan link drive untuk file ${key}`}
                                                        onChange={(e) => {
                                                            setData(
                                                                key,
                                                                e.target.value
                                                            );
                                                            if (
                                                                e.target.value
                                                                    .length !==
                                                                0
                                                            ) {
                                                                setSrc(
                                                                    DriveLinkThumbnail(
                                                                        GetLinkId(
                                                                            e
                                                                                .target
                                                                                ?.value
                                                                        )!
                                                                    )
                                                                );
                                                            } else {
                                                                setSrc(
                                                                    "/img/noimage.jpg"
                                                                );
                                                            }
                                                        }}
                                                        className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                                    focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                                                        id={key}
                                                    />
                                                    <small className="text-sm">
                                                        Tutorial upload image
                                                        menggunakan link drive,{" "}
                                                        <Link
                                                            href={route(
                                                                "tutorial"
                                                            )}
                                                            className="underline hover:text-blue-600"
                                                        >
                                                            Klik di sini
                                                        </Link>
                                                    </small>
                                                </div>
                                            ) : key == "body" ? (
                                                <>
                                                    <p className="text-sm text-red-600">
                                                        {ToCapitalCase(
                                                            errors[key]
                                                        )}
                                                    </p>
                                                    <Editor
                                                        type="body"
                                                        data={data.body}
                                                        setData={setData}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-red-600">
                                                        {ToCapitalCase(
                                                            errors[key]
                                                        )}
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={value as string}
                                                        placeholder={`Masukkan ${key}`}
                                                        onChange={(e) =>
                                                            setData(
                                                                key,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                                    focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                                                        id={key}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )
                            )}
                            <div className="flex justify-center p-4 gap-x-4">
                                <SuccessButton
                                    type="submit"
                                    onClick={() => setData("status", "draft")}
                                >
                                    Save
                                </SuccessButton>
                                <PublishButton
                                    type="submit"
                                    onClick={() =>
                                        setData("status", "published")
                                    }
                                >
                                    Publish
                                </PublishButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CategoryModal
                setSelectedOptions={setSelectedOptions}
                show={show}
                setShow={setShow}
                type="Post"
                method={method}
                categories={categories!}
            />
        </AuthenticatedLayout>
    );
}
