import { toast } from "react-toastify";

const warningToast = (message) => {
    toast.warn(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export default warningToast;