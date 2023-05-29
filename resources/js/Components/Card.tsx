import { FaCircle } from "react-icons/fa";

export default function Card({ childClassName }: { childClassName?: string }) {
    return (
        <div className="flex flex-col rounded-md bg-primaryDark shadow-md dark:bg-secondaryButtonDark">
            <div className="">
                <img
                    className="rounded-t-md"
                    src="/img/dummy.jpg"
                    alt="dummy"
                />
            </div>
            <div className="pt-3 px-2 min-h-[11rem] flex flex-col justify-between">
                <h5
                    className={
                        `font-semibold md:text-base text-xl ` + childClassName
                    }
                >
                    Mahasiswa itera Raih gelar winner di pemilihan putra putri
                    lampung
                </h5>
                <span className="text-xs text-accent font-medium flex flex-row items-center gap-x-1 h-12 dark:text-accentDark">
                    <FaCircle />4 May 2023
                </span>
            </div>
        </div>
    );
}
