import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function MainFooter() {
    return (
        <footer className="h-fit dark:bg-gradient-to-t dark:from-secondaryButtonDark dark:to-secondaryDark bg-gradient-to-t from-primaryDark to-secondary text-center flex flex-col gap-y-4 p-4">
            <hr />
            <div className="mb-3 grid grid-cols-2 text-left gap-3 container m-auto">
                <div className="flex flex-col gap-y-3">
                    <img
                        src="/img/logo-himatekia.png"
                        alt="logo tekia"
                        className="w-24"
                    />
                    <h6 className="font-semibold">
                        Himpunan Mahasiswa Teknik Kimia Institut Teknologi
                        Sumatera
                    </h6>
                    <p>
                        Visi kami adalah “Menjadi Prodi Teknik Kimia yang unggul
                        dan inovatif serta berkontribusi dalam industri proses
                        berbasis potensi lokal Sumatera dan Indonesia”
                    </p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <h5 className="text-accent text-lg font-bold">
                        Informasi Kontak
                    </h5>
                    <div>
                        <a
                            href="tel:(0896)24315277"
                            className="flex flex-row items-center gap-x-1 hover:text-accent"
                        >
                            <AiOutlinePhone className="rotate-90" />
                            (0896)2415277
                        </a>
                        <a
                            href="mailto:habibiunyila@gmail.com"
                            className="flex flex-row items-center gap-x-1 hover:text-accent"
                        >
                            <AiOutlineMail />
                            habibiunyila@gmail.com
                        </a>
                    </div>
                    <h5 className="text-accent text-lg font-bold">Alamat</h5>
                    <p>
                        Jl. Terusan Ryacudu, Way Huwi, Kec. Jati Agung,
                        Kabupaten Lampung Selatan, Lampung 35365, Indonesia
                    </p>
                    <a
                        href="https://www.google.com/maps/place/Institut+Teknologi+Sumatera/@-5.358264,105.314849,11z/data=!4m6!3m5!1s0x2e40c35634c1a611:0xcb3cf692dbb4f26!8m2!3d-5.3582643!4d105.3148495!16s%2Fg%2F119pgszv6?hl=id-ID&entry=ttu"
                        className="p-[10px_20px] w-fit rounded-md bg-secondaryButton hover:bg-opacity-50 dark:bg-secondaryButtonDark dark:hover:bg-secondaryDark"
                    >
                        Google Maps
                    </a>
                </div>
            </div>
            <hr />
            <div className="container m-auto">
                <p className="py-[15px]">
                    &copy; 2023 HIMATEKIA. All rights reserved.
                </p>
                <div className="flex justify-center items-center text-lg gap-x-3">
                    <a href="#">
                        <FaFacebook className="transition-all hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaTwitter className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaInstagram className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                    <a href="#">
                        <FaYoutube className="transition-all  hover:-translate-y-[5px]" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
