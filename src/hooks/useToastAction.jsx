import { useToast } from "../context/toastProvider";

export default function useToastAction() {
  const { addToast } = useToast();
  return {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error")
  }
}
