import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";
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
    function handleSubmit(e: FormEvent) {
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
    return auth.user ? (
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
                <PrimaryButton className="w-fit mt-10" disabled={processing}>
                    Pos Komentar
                </PrimaryButton>
            </form>
        </>
    ) : (
        <p className="text-accent dark:text-accentDark">
            Silahkan login untuk memberikan komentar*
        </p>
    );
}
