import DashboardCheckbox from "@/Components/DashboardCheckbox";
import Editor from "@/Components/Editor";
import PublishButton from "@/Components/PublishButton";
import SuccessButton from "@/Components/SuccessButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CategoryType, PageProps, content } from "@/types";
import CamelToTitle from "@/utils/CamelToTitle";
import ToCapitalCase from "@/utils/ToCapitalCase";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    ChangeEvent,
    Fragment,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import { PostType } from "@/types";
import CategoryModal from "@/Components/CategoryModal";
import DriveLink from "@/utils/DriveLink";
import GetLinkId from "@/utils/GetLinkId";
import { useDebounce } from "use-debounce";
export default function Edit({
    logo,
    auth,
    postingan,
    categories,
}: PageProps<{
    logo: content;
    categories: CategoryType[];
    postingan: PostType;
}>) {
    interface PostDashboardType {
        title: string;
        image: string;
        categories: string[];
        body: string;
        status: string;
        [key: string]: unknown;
    }
    const { errors } = usePage().props;
    const { data, setData } = useForm<PostDashboardType>({
        title: postingan.title,
        image: postingan.image,
        categories: postingan.categories.map((category) => category.name),
        body: postingan.body,
        status: postingan.status,
    });
    const [src, setSrc] = useState<string>("/img/noimage.jpg");
    const [source] = useDebounce<string>(src, 100);
    const [show, setShow] = useState<boolean>(false);
    const [method, setMethod] = useState<string>("");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        router.post(
            route("posts.update", postingan.slug),
            {
                _method: "put",
                title: data.title,
                image: data.image,
                categories: data.categories,
                body: data.body,
                status: data.status,
            },
            { preserveScroll: true }
        );
    };

    const [selectedOptions, setSelectedOptions] = useState<string[]>(
        data.categories
    );
    useEffect(() => {
        setData("categories", selectedOptions);
    }, [selectedOptions]);
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4">
                    Post Edit
                </h2>
            }
        >
            <Head title="Post Edit" />
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
                                Edit Post Information
                            </header>

                            {Object.entries(data as PostDashboardType).map(
                                ([key, value]) =>
                                    key == "status" ? (
                                        <Fragment key={key}></Fragment>
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
                                                <div className="flex flex-col items-center gap-y-3">
                                                    <div className="flex flex-row w-full">
                                                        <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                            <img
                                                                src={DriveLink(
                                                                    postingan.image
                                                                )}
                                                                alt="Hero Image"
                                                                width={200}
                                                                className="rounded-md"
                                                            />
                                                            <small>
                                                                Current Image
                                                            </small>
                                                        </div>
                                                        <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                            <img
                                                                src={source}
                                                                alt="cover buku"
                                                                width={200}
                                                                className="rounded-md"
                                                            />
                                                            <small>
                                                                Image you want
                                                                to change
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-red-600 capitalize">
                                                        {errors[key]}
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
                                                                    DriveLink(
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
                                <SuccessButton type="submit">
                                    Save
                                </SuccessButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CategoryModal
                show={show}
                setShow={setShow}
                type="Post"
                method={method}
                setSelectedOptions={setSelectedOptions}
                categories={categories!}
            />
        </AuthenticatedLayout>
    );
}
