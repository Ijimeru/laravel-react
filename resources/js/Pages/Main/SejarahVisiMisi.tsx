import Main from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function SejarahVisiMisi() {
    return (
        <Main>
            <Head title="Profil" />
            <section className="bg-[url('/img/hero-img.jpg')] h-[12rem] bg-cover bg-center bg-no-repeat bg-white relative flex justify-center items-center flex-col text-center mt-4">
                <div className="text-primaryDark z-10">
                    <h4 className="text-3xl">Sejarah & Visi Misi</h4>
                    <p className="font-medium">Himpunan Mahasiswa Teknik Kimia ITERA, ketahui lebih banyak mengenai himpunan</p>
                </div>
                <div className="flex flex-col h-full w-full bg-[#680000] opacity-30 absolute"></div>
            </section>

            <section className="container m-auto mt-6 gap-x-4 flex flex-col-reverse md:flex-row gap-y-5 p-4">
                <div className="grow basis-0">
                    <h6 className="text-3xl font-extrabold text-accent">Sejarah</h6>
                    <p className="text-primary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel sapiente corporis atque, sit quibusdam neque, veniam accusamus maxime cupiditate optio minus doloremque sunt consectetur molestiae voluptas? Fugiat dolores tenetur commodi, facilis obcaecati laudantium enim corporis, eos odit totam, deserunt nisi.</p>
                </div>
                <div className="flex justify-center grow basis-0">
                    <img src="/img/dummy2.jpg" alt="" className="rounded-md" />
                </div>
            </section>
            <section className="flex mt-6 flex-col md:flex-row">
                <div className="grow basis-0 shrink bg-[#680000] flex items-center p-6 m-2 rounded-md md:rounded-none md:p-0 md:m-0">
                    <div className="flex-col md:ml-36 md:mr-6">
                        <h4 className="uppercase font-extrabold text-3xl text-yellow-500">visi</h4>
                        <p className="text-primaryDark mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse laborum ipsam delectus maiores eligendi repellendus error autem voluptatem sed? Soluta.
                        </p>
                    </div>

                </div>
                <div className="grow basis-0 shrink p-6 flex flex-col justify-center">
                    <h4 className="uppercase font-extrabold text-3xl text-primary">misi</h4>
                    <ol className="list-decimal mt-3 ml-4">
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!</li>
                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt magni non nam fugiat illum alias excepturi qui culpa voluptatibus!</li>
                    </ol>
                </div>
            </section>
        </Main>
    );
}
