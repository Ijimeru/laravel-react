import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { content } from "@/types";

export default function ForgotPassword({
    status,
    kontak,
    logo,
}: {
    status?: string;
    kontak: content;
    logo: content;
}) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout logo={logo}>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Lupa password? Tidak masalah. Beri tahu kami pada nomor whatsapp
                berikut ini, sehingga kami dapat membantu untuk reset password
            </div>
            <div className="flex flex-col justify-center gap-y-4">
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <div className="flex justify-center">
                    <PrimaryButton>
                        <a
                            href={decodeURI(
                                `whatsapp://send?phone=${kontak?.content}&text=Permisi saya ingin reset password email saya dengan email lengkap: ${data.email} , terima kasih`
                            )}
                        >
                            Kirim ticket!
                        </a>
                    </PrimaryButton>
                </div>
            </div>

            {/* {status && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                    {status}
                </div>
            )} */}

            {/* <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
