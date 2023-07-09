import { PostType } from "@/types";
import { FaCircle } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
dayjs.extend(relativeTime);
export default function Card({
    childClassName,
    post,
}: {
    childClassName?: string;
    post?: PostType;
}) {
    return (
        <div className="flex flex-col rounded-md bg-primaryDark shadow-md dark:bg-secondaryButtonDark">
            <div className="">
                <img
                    className="rounded-t-md"
                    src={`/storage/${post?.image}`}
                    alt="dummy"
                />
            </div>
            <div className="pt-3 px-2 min-h-[11rem] flex flex-col justify-between">
                <h5
                    className={
                        `font-semibold md:text-base text-xl ` + childClassName
                    }
                >
                    {post?.title}
                </h5>
                <span className="text-xs text-accent font-medium flex flex-row items-center gap-x-1 h-12 dark:text-accentDark">
                    <FaCircle />
                    {dayjs(post?.created_at)
                        .locale("id")
                        .format("DD MMMM YYYY")}
                </span>
            </div>
        </div>
    );
}
