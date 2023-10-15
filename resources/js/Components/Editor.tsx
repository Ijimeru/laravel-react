import { useAppSelector } from "@/store/store";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

type setDataByObject<TForm> = (data: TForm) => void;
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(
    key: K,
    value: TForm[K]
) => void;
interface PostType {
    title: string;
    image: string;
    categories: string[];
    body: string;
    status: string;
    [key: string]: unknown;
}
export default function Editor({
    setData,
    data,
    type,
}: {
    setData: setDataByObject<PostType> &
        setDataByMethod<PostType> &
        setDataByKeyValuePair<PostType>;
    data: string;
    type: string;
}) {
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <div className={`editor  ${mode == "light" ? "" : "dark"}`}>
            <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setData(type, data);
                }}
            />
        </div>
    );
}
