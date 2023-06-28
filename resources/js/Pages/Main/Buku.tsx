import AutocompleteDropdown from "@/Components/AutocompleteDropdown";
import CheckboxesTags from "@/Components/CheckboxesTags";

import Pagination from "@/Components/Pagination";
import SelectNumberPage from "@/Components/SelectNumberPage";
import { HomeContext } from "@/Context/HomeContext";
import Main from "@/Layouts/MainLayout";
import { BookType, CategoryType, PageProps } from "@/types";
import { checkSubsequence } from "@/utils/CheckSubsequence";
import { Transition } from "@headlessui/react";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

export default function Buku({
    books,
    categories,
}: {
    books: BookType[];
    categories: CategoryType[];
}) {
    const [hover, setHover] = useState<string>("");

    const [jumlahPostPerHalaman, setJumlahPostPerHalaman] = useState<number>(5);
    const [current, setCurrent] = useState<number>(1);

    const jumlahHalaman = Math.ceil(books?.length! / jumlahPostPerHalaman!);
    const start = (current! - 1) * jumlahPostPerHalaman!;
    const stop =
        current != jumlahHalaman
            ? start + jumlahPostPerHalaman!
            : jumlahHalaman * jumlahPostPerHalaman! - books?.length! != 0
            ? books?.length
            : start + jumlahPostPerHalaman!;

    const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);
    const [selectedOptions, setSelectedOptions] = useState<CategoryType[]>([]);
    useEffect(() => {
        setFilteredBooks(
            books.filter((book) =>
                checkSubsequence(
                    selectedOptions.map((val) => val.name),
                    book.categories.map((val) => val.name)
                )
            )
        );
    }, [selectedOptions]);
    useEffect(() => {
        setFilteredBooks(books?.slice(start, stop));
    }, [jumlahPostPerHalaman, current, selectedOptions, books]);
    return (
        <Main>
            <Head title="Buku" />
            <section className="flex p-3 container m-auto h-64  mt-6">
                <div className="flex bg-secondaryButton rounded-xl justify-center items-center dark:bg-secondaryButtonDark w-full">
                    <h2 className="text-5xl">Semua Buku</h2>
                </div>
            </section>
            <section className="p-3 container m-auto mt-4 gap-y-3">
                <div
                    className="flex w-full flex-col-reverse bg-primaryDark dark:bg-secondaryButtonDark rounded-md p-4 items-center text-primary dark:text-primaryDark 
                gap-y-3"
                >
                    <SelectNumberPage
                        current={current}
                        setCurrent={setCurrent}
                        jumlahPostPerHalaman={jumlahPostPerHalaman.toString()}
                        jumlahPost={filteredBooks.length}
                        label="Jumlah berita per halaman"
                        setJumlahPostPerHalaman={setJumlahPostPerHalaman}
                    />

                    <div className="w-full flex flex-row gap-x-3">
                        <CheckboxesTags
                            current={current}
                            setCurrent={setCurrent}
                            jumlahData={filteredBooks.length}
                            jumlahDataPerHalaman={jumlahPostPerHalaman}
                            category={categories}
                            selectedOptions={selectedOptions!}
                            setSelectedOptions={setSelectedOptions}
                        />
                    </div>
                    <input
                        type="text"
                        className="rounded-lg h-8 w-full border border-gray-400 hover:border-gray-800  dark:bg-secondaryButtonDark dark:border-[#4a4a4d] bg-primaryDark
                        focus:border-primary dark:hover:border-primaryDark dark:focus:border-primaryDark dark:placeholder:text-[rgb(187,187,187)]"
                        placeholder="Cari buku..."
                        onChange={(e) => {
                            let filterBook: BookType[] = books.filter((post) =>
                                post.title
                                    .toLowerCase()
                                    .includes(e.target.value)
                            );
                            setFilteredBooks(filterBook);
                            if (
                                current >
                                Math.ceil(
                                    filterBook.length / jumlahPostPerHalaman
                                )
                            ) {
                                setCurrent(1);
                            }
                        }}
                    />
                </div>
            </section>

            <section className="p-3 container m-auto mt-4 w-full">
                <div className="grid w-full bg-primaryDark dark:bg-secondaryButtonDark rounded-md items-center justify-center text-primary dark:text-primaryDark grid-cols-1 md:grid-cols-4 p-3 center gap-y-10 md:gap-4">
                    {filteredBooks.map((book) => (
                        <div
                            className="relative"
                            onMouseEnter={(e) =>
                                hover != book.id.toString()
                                    ? setHover(book.id.toString())
                                    : ""
                            }
                            onMouseLeave={(e) => setHover("")}
                        >
                            <div
                                className={`relative ${
                                    hover == book.id.toString()
                                        ? "scale-105 blur-sm"
                                        : ""
                                } transition-all`}
                            >
                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className={`rounded-md transition-all w-full`}
                                />
                            </div>
                            <div>
                                <Transition
                                    show={book.id.toString() == hover}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-105"
                                    leave="transition ease-in duration-75 delay-200"
                                    leaveFrom="transform opacity-100 scale-105"
                                    leaveTo="transform opacity-0 scale-95"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        width: "100%",
                                    }}
                                >
                                    <div className="absolute flex flex-col justify-center items-center w-full bg-primaryDark dark:bg-secondaryButtonDark p-3 pt-0 rounded-md ">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-center mt-3 font-bold">
                                                {book.title.length > 15
                                                    ? book.title.slice(0, 15) +
                                                      "..."
                                                    : book.title}
                                            </span>
                                            <span>{book.tahun}</span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center text-accent dark:text-accentDark">
                                            <a href={book.file} target="blank">
                                                Download
                                            </a>
                                            <a href={book.file} target="blank">
                                                Baca online
                                            </a>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Pagination
                className="flex justify-center items-center"
                current={current!}
                setCurrent={setCurrent!}
                jumlahPost={books?.length!}
                jumlahPostPerHalaman={jumlahPostPerHalaman!}
            />
        </Main>
    );
}
