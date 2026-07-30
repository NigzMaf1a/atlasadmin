import { toast } from "react-hot-toast";

type Variant = "success" | "info" | "warn" | "danger";

export default function Toaster(
    message: string,
    variant: Variant = "info"
) {
    switch (variant) {
        case "success":
            return toast.success(message);

        case "danger":
            return toast.error(message);

        case "warn":
            return toast(message, {
                style: {
                    background: "#facc15",
                    color: "#000",
                },
            });

        case "info":
        default:
            return toast(message, {
                icon: "ℹ️",
                style: {
                    background: "#2563eb",
                    color: "#fff",
                },
            });
    }
}