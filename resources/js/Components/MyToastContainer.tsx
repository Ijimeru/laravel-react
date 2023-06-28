import { useAppSelector } from "@/store/store";
import { ToastContainer } from "react-toastify";

export default function MyToastContainer() {
    const mode = useAppSelector((state) => state.mode.mode);
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={mode == "light" ? "light" : "dark"}
        />
    );
}
