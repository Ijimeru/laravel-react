import Cards from "@/Components/Cards";
import CheckboxesTags from "@/Components/CheckboxesTags";
import Main from "@/Layouts/MainLayout";
import { CategoryType, PageProps, PostType } from "@/types";
import { Head, Link, router, usePage, useRemember } from "@inertiajs/react";
import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { checkSubsequence } from "../../utils/CheckSubsequence";
import SelectNumberPage from "@/Components/SelectNumberPage";

export default function Berita({
    posts,
    categories,
}: {
    posts: PostType[];
    categories: CategoryType[];
}) {
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts);
    const [selectedOptions, setSelectedOptions] = useRemember<CategoryType[]>(
        []
    );
    const [jumlahPostPerHalaman, setJumlahPostPerHalaman] =
        useRemember<number>(5);
    function searchBerita() {}
    const [current, setCurrent] = useState<number>(1);
    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) =>
                checkSubsequence(
                    selectedOptions.map((val) => val.name),
                    post.categories.map((val) => val.name)
                )
            )
        );
    }, [selectedOptions]);

    return (
        <Main>
            <Head title="Berita" />
            <section className="flex p-3 container m-auto h-64  mt-6">
                <div className="flex bg-secondaryButton rounded-xl justify-center items-center dark:bg-secondaryButtonDark w-full">
                    <h2 className="text-5xl">Semua Berita</h2>
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
                        jumlahPost={filteredPosts.length}
                        label="Jumlah berita per halaman"
                        setJumlahPostPerHalaman={setJumlahPostPerHalaman}
                    />
                    <input
                        type="text"
                        className="rounded-lg h-8 w-full border-2 border-secondaryButton dark:border-secondaryButtonDark dark:bg-secondaryDark bg-secondary
                        focus:border-primary dark:focus:border-accentDark"
                        placeholder="Cari berita..."
                        onChange={(e) => {
                            let filterPost: PostType[] = posts.filter((post) =>
                                post.title
                                    .toLowerCase()
                                    .includes(e.target.value)
                            );
                            setFilteredPosts(filterPost);
                            if (
                                current >
                                Math.ceil(
                                    filterPost.length / jumlahPostPerHalaman
                                )
                            ) {
                                setCurrent(1);
                            }
                        }}
                    />
                    <div className="w-full flex flex-row gap-x-3">
                        <CheckboxesTags
                            current={current}
                            setCurrent={setCurrent}
                            jumlahPost={filteredPosts.length}
                            jumlahPostPerHalaman={jumlahPostPerHalaman}
                            category={categories}
                            selectedOptions={selectedOptions!}
                            setSelectedOptions={setSelectedOptions}
                        />
                        <Button
                            sx={{
                                bgcolor: "#d58bfa",
                                color: "#06312f",
                                textTransform: "none",
                            }}
                            onClick={() => searchBerita()}
                        >
                            Cari Berdasarkan Bategori
                        </Button>
                    </div>
                </div>
            </section>
            <section
                className={`mt-4 flex border-secondaryButtonDark w-full h-full p-3 container m-auto ${
                    filteredPosts.length > 0 ? "" : "justify-center"
                }`}
            >
                {filteredPosts.length > 0 ? (
                    <Cards
                        posts={filteredPosts}
                        noButton={true}
                        pagination={true}
                        jumlahPostPerHalaman={jumlahPostPerHalaman}
                        current={current}
                        setCurrent={setCurrent}
                        selectedOptions={selectedOptions}
                    />
                ) : (
                    <h2 className="text-center text-2xl">
                        Berita tidak ditemukan
                    </h2>
                )}
            </section>
        </Main>
    );
}
