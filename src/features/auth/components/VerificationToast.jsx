import { useEffect } from "react";
import { toast } from "sonner";

function VerificationToast() {
  useEffect(() => {
    toast.success("Email verified successfully. You can now sign in.");
  }, []);
}

export default VerificationToast;
