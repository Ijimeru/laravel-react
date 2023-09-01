import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { User } from "@/types";
import CheckRole from "@/utils/CheckRole";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function ({
    auth,
    post_id,
}: {
    auth: { user: User };
    post_id: number;
}) {
    const { data, setData, processing, errors, reset, post, clearErrors } =
        useForm<{
            content: string;
            post_id: number;
        }>({ content: "", post_id: post_id });
    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        post(route("comments.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
                toast.success("Komentar berhasil ditambahkan");
            },
        });
    }
    const roles = auth.user?.roles;
    if (auth.user && CheckRole(roles, "default")) {
        return (
            <>
                <h2 className="text-lg mb-4">Komentar Anda</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <InputLabel htmlFor="comment">Comment*</InputLabel>
                    <textarea
                        className="rounded-md dark:bg-[#111827] border-[rgb(209,213,219)] dark:border-[rgb(55,65,81)]"
                        id="comment"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                    />
                    <InputError message={errors.content} />
                    <PrimaryButton
                        className="w-fit mt-10"
                        disabled={processing}
                    >
                        Pos Komentar
                    </PrimaryButton>
                </form>
            </>
        );
    } else if (auth.user && !CheckRole(roles, "default")) {
        return (
            <p className="text-accent dark:text-accentDark">
                Akun anda sudah di ban, tidak dapat komentar*
            </p>
        );
    } else {
        return (
            <p className="text-accent dark:text-accentDark">
                Silahkan login untuk memberikan komentar*
            </p>
        );
    }
}
