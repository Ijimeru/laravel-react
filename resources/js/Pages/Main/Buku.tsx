import CheckboxesTags from "@/Components/CheckboxesTags";
import Modal from "@/Components/Modal";

import Pagination from "@/Components/Pagination";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectNumberPage from "@/Components/SelectNumberPage";
import Main from "@/Layouts/MainLayout";
import { BookType, CategoryType, content } from "@/types";
import { checkSubsequence } from "@/utils/CheckSubsequence";
import DriveLink from "@/utils/DriveLink";
import DriveLinkDownload from "@/utils/DriveLinkDownload";
import DriveLinkThumbnail from "@/utils/DriveLinkThumbnail";
import { Transition } from "@headlessui/react";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Buku({
    books,
    categories,
    logo,
    visi,
    kontak,
}: {
    books: BookType[];
    categories: CategoryType[];
    logo: content;
    visi: content;
    kontak: content;
}) {
    const [hover, setHover] = useState<string>("");

    const [jumlahPostPerHalaman, setJumlahPostPerHalaman] = useState<number>(5);
    const [current, setCurrent] = useState<number>(1);
    const [bookPage, setBookPage] = useState<BookType[]>(books);
    const [filteredBooks, setFilteredBooks] = useState<BookType[]>(bookPage);
    const jumlahHalaman = Math.ceil(books?.length! / jumlahPostPerHalaman!);
    const start = (current! - 1) * jumlahPostPerHalaman!;
    const stop =
        current != jumlahHalaman
            ? start + jumlahPostPerHalaman!
            : jumlahHalaman * jumlahPostPerHalaman! - books?.length! != 0
            ? books?.length
            : start + jumlahPostPerHalaman!;

    const [selectedOptions, setSelectedOptions] = useState<CategoryType[]>([]);
    const [id, setId] = useState<string>("1");
    const [show, setShow] = useState<boolean>(false);
    useEffect(() => {
        setBookPage(
            books.filter((book) =>
                checkSubsequence(
                    selectedOptions.map((val) => val.name),
                    book.categories.map((val) => val.name)
                )
            )
        );
    }, [selectedOptions]);
    useEffect(() => {
        setFilteredBooks(bookPage?.slice(start, stop));
    }, [jumlahPostPerHalaman, current, selectedOptions, bookPage]);
    return (
        <Main logo={logo} visi={visi} kontak={kontak}>
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
                        placeholder="Cari buku berdasarkan judul,author, dan tahun..."
                        onChange={(e) => {
                            let filterBook: BookType[] = books.filter(
                                (book) => {
                                    return (
                                        book.title
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            ) ||
                                        book.tahun
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            ) ||
                                        book.author
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            )
                                    );
                                }
                            );
                            setBookPage(filterBook);
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
                <div
                    className={`grid w-full rounded-md items-center justify-center text-primary dark:text-primaryDark grid-cols-1 ${
                        bookPage.length != 0 ? "md:grid-cols-4" : ""
                    } p-3 center gap-y-10 md:gap-4`}
                >
                    {bookPage.length != 0 ? (
                        filteredBooks.map((book) => (
                            <div
                                className="relative"
                                onMouseEnter={(e) => {
                                    hover != book.id.toString()
                                        ? setHover(book.id.toString())
                                        : setHover("");
                                }}
                                onMouseLeave={(e) => setHover("")}
                                key={book.id}
                            >
                                <div
                                    className={`relative ${
                                        hover == book.id.toString()
                                            ? "scale-105 blur-sm"
                                            : ""
                                    } transition-all`}
                                >
                                    <img
                                        src={
                                            book.file
                                                ? DriveLinkThumbnail(book.file)
                                                : "/img/noimage.jpg"
                                        }
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
                                                        ? book.title.slice(
                                                              0,
                                                              15
                                                          ) + "..."
                                                        : book.title}
                                                </span>
                                                <span>{book.tahun}</span>
                                            </div>
                                            <div className="flex flex-col justify-center items-center text-accent dark:text-accentDark">
                                                <a
                                                    href={DriveLinkDownload(
                                                        book.file
                                                    )}
                                                    download={`${book.title}.pdf`}
                                                >
                                                    Download
                                                </a>
                                                <a
                                                    href={DriveLink(book.file)}
                                                    target="blank"
                                                >
                                                    Baca online
                                                </a>
                                                <button
                                                    onClick={() => {
                                                        setId(
                                                            book.id.toString()
                                                        );
                                                        setShow(true);
                                                    }}
                                                >
                                                    Informasi Detail
                                                </button>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">
                            Buku tidak ditemukan
                        </p>
                    )}
                </div>
            </section>
            {bookPage.length != 0 ? (
                <Pagination
                    className="flex justify-center items-center"
                    current={current!}
                    setCurrent={setCurrent!}
                    jumlahPost={bookPage?.length!}
                    jumlahPostPerHalaman={jumlahPostPerHalaman!}
                />
            ) : null}
            {books.length != 0 ? (
                <Modal
                    maxWidth="md"
                    show={show}
                    onClose={() => {
                        setShow(false);
                    }}
                >
                    <div className="p-6 flex gap-y-3 flex-col items-center">
                        <button
                            className="self-start text-xl"
                            onClick={() => setShow(false)}
                        >
                            x
                        </button>
                        <h2 className="text-3xl">Book Information</h2>
                        <img
                            src={
                                books.filter(
                                    (book) => book.id.toString() == id
                                )[0]?.file
                                    ? DriveLinkThumbnail(
                                          books.filter(
                                              (book) => book.id.toString() == id
                                          )[0]?.file
                                      )
                                    : "/img/noimage.jpg"
                            }
                            alt="Cover buku"
                            width={150}
                            className="rounded-md"
                        />
                        <div>
                            <p>
                                Judul :{" "}
                                {
                                    books.filter(
                                        (book) => book.id.toString() == id
                                    )[0]?.title
                                }
                            </p>
                            <p>
                                Tahun :{" "}
                                {
                                    books.filter(
                                        (book) => book.id.toString() == id
                                    )[0]?.tahun
                                }
                            </p>
                            {books.filter((book) => book.id.toString() == id)[0]
                                ?.penerbit && (
                                <p>
                                    Penerbit :{" "}
                                    {
                                        books.filter(
                                            (book) => book.id.toString() == id
                                        )[0]?.penerbit
                                    }
                                </p>
                            )}

                            <p>
                                Author :{" "}
                                {
                                    books.filter(
                                        (book) => book.id.toString() == id
                                    )[0]?.author
                                }
                            </p>
                            <p>
                                Kategori :{" "}
                                {books
                                    .filter(
                                        (book) => book.id.toString() == id
                                    )[0]
                                    ?.categories.map(
                                        (category, index, { length }) =>
                                            index == length - 1 ? (
                                                <span>{category.name}</span>
                                            ) : (
                                                <span>
                                                    {category.name + " , "}
                                                </span>
                                            )
                                    )}
                            </p>
                            <div className="mt-4 flex flex-row gap-x-3 justify-center">
                                <SecondaryButton>
                                    <a
                                        href={DriveLinkDownload(
                                            books.filter(
                                                (book) =>
                                                    book.id.toString() == id
                                            )[0]?.file
                                        )}
                                        download={`${
                                            books.filter(
                                                (book) =>
                                                    book.id.toString() == id
                                            )[0]?.title
                                        }.pdf`}
                                    >
                                        Download
                                    </a>
                                </SecondaryButton>
                                <SecondaryButton>
                                    <a
                                        href={DriveLink(
                                            books.filter(
                                                (book) =>
                                                    book.id.toString() == id
                                            )[0]?.file
                                        )}
                                        target="_blank"
                                    >
                                        Baca Online
                                    </a>
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </Main>
    );
}
