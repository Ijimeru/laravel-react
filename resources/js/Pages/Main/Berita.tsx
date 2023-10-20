import Cards from "@/Components/Cards";
import CheckboxesTags from "@/Components/CheckboxesTags";
import SelectNumberPage from "@/Components/SelectNumberPage";
import Main from "@/Layouts/MainLayout";
import { CategoryType, PageProps, PostType, content } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { checkSubsequence } from "../../utils/CheckSubsequence";

export default function Berita({
    posts,
    categories,
    ziggy,
    logo,
    visi,
    kontak,
}: PageProps<{
    posts: PostType[];
    categories: CategoryType[];
    logo: content;
    visi: content;
    kontak: content;
}>) {
    const category = ziggy.query.category;
    const [selectedOptions, setSelectedOptions] = useState<CategoryType[]>(
        category
            ? categories.filter((categorys) => categorys.name == category)
            : []
    );
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
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>(
        category
            ? posts.filter((post) =>
                  post.categories
                      .map((category) => category.name)
                      .includes(category)
              )
            : posts
    );

    const [jumlahPostPerHalaman, setJumlahPostPerHalaman] = useState<number>(8);
    const [current, setCurrent] = useState<number>(1);

    return (
        <Main logo={logo} visi={visi} kontak={kontak}>
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

                    <div className="w-full flex flex-row gap-x-3">
                        <CheckboxesTags
                            current={current}
                            setCurrent={setCurrent}
                            jumlahData={filteredPosts.length}
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
                        placeholder="Cari berita berdasarkan judul, author, dan isi"
                        onChange={(e) => {
                            let filterPost: PostType[] = posts.filter(
                                (post) => {
                                    return (
                                        post.title
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            ) ||
                                        post.author.name
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            ) ||
                                        post.body
                                            .toLowerCase()
                                            .includes(
                                                e.target.value.toLowerCase()
                                            )
                                    );
                                }
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
