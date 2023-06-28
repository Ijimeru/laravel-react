import { DashboardContext } from "@/Context/DashboardContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

export default function MyToastContainer(){
    const {mode} = useContext(DashboardContext)
    return                 <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={mode == "light"? "light":"dark"}
/>
}