import DashboardCheckbox from "@/Components/DashboardCheckbox";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { BookType, CategoryType, PageProps, content } from "@/types";
import CamelToTitle from "@/utils/CamelToTitle";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Edit({
    logo,
    auth,
    book,
    categories,
}: PageProps<{ logo: content; categories: CategoryType[]; book: BookType }>) {
    interface BookPostType {
        title: string;
        cover: File | string;
        categories: string[];
        file: File | string;
        author: string;
        tahun: string;
        penerbit: string;
        [key: string]: unknown;
    }
    const { data, setData, patch, errors } = useForm<BookPostType>({
        title: book.title,
        cover: book.cover,
        categories: book.categories.map((category) => category.name),
        file: book.file,
        author: book.author,
        tahun: book.tahun,
        penerbit: book.penerbit,
    });
    const [src, setSrc] = useState<string>("/img/noimage.jpg");

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        patch(route("books.update", book.id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("nice");
            },
        });
    };
    function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files![0];
        if (!file) {
            setSrc("/img/noimage.jpg");
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
        setData("cover", file);
    }

    const [selectedOptions, setSelectedOptions] = useState<string[]>(
        book.categories.map((category) => category.name)
    );
    useEffect(() => {
        setData("categories", selectedOptions);
    }, [selectedOptions]);
    return (
        <AuthenticatedLayout
            logo={logo}
            user={auth.user}
            book={book}
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
                                            {CamelToTitle(key)}
                                        </label>
                                        {key == "categories" ? (
                                            <>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
                                                </p>
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
                                            </>
                                        ) : key == "file" ? (
                                            <>
                                                <p className="text-sm text-red-600 capitalize">
                                                    {errors[key]}
                                                </p>
                                                <input
                                                    type="file"
                                                    className="cursor-pointer dark:bg-slate-500 rounded-md bg-secondary border w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "file",
                                                            e.target.files![0]
                                                        )
                                                    }
                                                />
                                            </>
                                        ) : key == "cover" ? (
                                            <div className="flex flex-col items-center gap-y-3">
                                                <div className="flex flex-row w-full">
                                                    <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                        <img
                                                            src={
                                                                "/storage/" +
                                                                book.cover
                                                            }
                                                            alt="cover buku"
                                                            width={200}
                                                            className="rounded-md"
                                                        />
                                                        <small>
                                                            Current Cover
                                                        </small>
                                                    </div>
                                                    <div className="flex-1 flex items-center flex-col gap-y-4 justify-between">
                                                        <img
                                                            src={src}
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
                                                <input
                                                    type="file"
                                                    className="cursor-pointer dark:bg-slate-500 rounded-md bg-secondary border w-full"
                                                    onChange={handleCoverChange}
                                                />
                                            </div>
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
                                <SecondaryButton className="" type="submit">
                                    Submit
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
