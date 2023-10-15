import CategoryModal from "@/Components/CategoryModal";
import DashboardCheckbox from "@/Components/DashboardCheckbox";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BookType, CategoryType, PageProps, content } from "@/types";
import CamelToTitle from "@/utils/CamelToTitle";
import DriveLink from "@/utils/DriveLink";
import DriveLinkThumbnail from "@/utils/DriveLinkThumbnail";
import GetLinkId from "@/utils/GetLinkId";
import { Head, useForm, router, usePage, Link } from "@inertiajs/react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function Edit({
    logo,
    auth,
    book,
    categories,
}: PageProps<{ logo: content; categories: CategoryType[]; book: BookType }>) {
    const { errors } = usePage().props;
    interface BookPostType {
        title: string;
        categories: string[];
        file: string;
        author: string;
        tahun: string;
        penerbit: string;
        [key: string]: unknown;
    }
    const { data, setData } = useForm<BookPostType>({
        title: book.title,
        categories: book.categories.map((category) => category.name),
        file: book.file,
        author: book.author,
        tahun: book.tahun,
        penerbit: book.penerbit,
    });
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        router.post(
            route("books.update", book.id),
            {
                _method: "put",
                title: data.title,
                categories: data.categories,
                file: data.file,
                author: data.author,
                tahun: book.tahun,
                penerbit: data.penerbit,
            },
            { preserveScroll: true }
        );
    };

    const [selectedOptions, setSelectedOptions] = useState<string[]>(
        book.categories.map((category) => category.name)
    );
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        setData("categories", selectedOptions);
    }, [selectedOptions]);
    const [method, setMethod] = useState<string>("");
    const src: string = "/img/noimage.jpg";
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-3 flex flex-row items-center gap-x-4">
                    Update Book
                </h2>
            }
        >
            <Head title="Update Book" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg text-gray-900 dark:text-gray-100">
                        <form onSubmit={handleSubmit}>
                            <Link
                                href={route("books.index")}
                                className="text-2xl ml-3 hover:text-red-600"
                            >
                                &larr;
                            </Link>
                            <header className="w-full text-center mt-3 text-2xl font-semibold">
                                Edit Book Infromation
                            </header>

                            {Object.entries(data as BookPostType).map(
                                ([key, value]) => (
                                    <div
                                        className="flex flex-col mt-4 p-4 gap-y-4"
                                        key={key}
                                    >
                                        <label
                                            htmlFor={key}
                                            className="text-lg font-semibold"
                                        >
                                            {CamelToTitle(key)}{" "}
                                            {!(key === "penerbit") &&
                                                !(
                                                    key === ("cover" as string)
                                                ) && (
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                )}
                                        </label>
                                        {key == "categories" ? (
                                            <>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
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
                                                            setMethod("post");
                                                            setShow(true);
                                                        }}
                                                    >
                                                        +
                                                    </div>
                                                    <div
                                                        className="rounded-full p-4 text-3xl cursor-pointer"
                                                        onClick={() => {
                                                            setMethod("delete");
                                                            setShow(true);
                                                        }}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </>
                                        ) : key == "file" ? (
                                            <>
                                                <div className="flex flex-row w-full">
                                                    <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                        <LazyLoadImage
                                                            src={DriveLinkThumbnail(
                                                                book.file
                                                            )}
                                                            alt="cover buku"
                                                            width={200}
                                                            className="rounded-md"
                                                        />
                                                        <small>
                                                            Current Cover
                                                        </small>
                                                    </div>
                                                    <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                        <LazyLoadImage
                                                            src={
                                                                data.file
                                                                    ? DriveLinkThumbnail(
                                                                          GetLinkId(
                                                                              data.file
                                                                          )!
                                                                      )
                                                                    : src
                                                            }
                                                            alt="cover buku"
                                                            width={200}
                                                            className="rounded-md"
                                                        />
                                                        <small>
                                                            Cover you want to
                                                            change
                                                        </small>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
                                                </p>
                                                <SecondaryButton className="w-fit">
                                                    <a
                                                        href={DriveLink(
                                                            value as string
                                                        )}
                                                        target="_blank"
                                                    >
                                                        File Sekarang
                                                    </a>
                                                </SecondaryButton>
                                                <input
                                                    type="text"
                                                    placeholder={`Masukkan link drive untuk ${key}`}
                                                    value={value as string}
                                                    onChange={(e) => {
                                                        setData(
                                                            key,
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                                    focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)] px-3"
                                                    id={key}
                                                />
                                                <small className="text-sm">
                                                    Tutorial upload file
                                                    menggunakan link drive,{" "}
                                                    <Link
                                                        href={route("tutorial")}
                                                        className="underline hover:text-blue-600"
                                                    >
                                                        Klik di sini
                                                    </Link>
                                                </small>
                                            </>
                                        ) : key == "tahun" ? (
                                            <>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
                                                </p>
                                                <input
                                                    type="number"
                                                    value={value as string}
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
                                        ) : (
                                            <>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
                                                </p>
                                                <input
                                                    type="text"
                                                    value={value as string}
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
                            <div className="flex justify-center p-4">
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
                type="Book"
                method={method}
                setSelectedOptions={setSelectedOptions}
                categories={categories}
            />
        </AuthenticatedLayout>
    );
}
