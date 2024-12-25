import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const useLogout = (setIsLoggingOut: any) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      setIsLoggingOut(true);
      const response = await signOut();
      return response;
    },
    onMutate: () => {
      toast.loading("We are securely logging you out. Please wait a moment.",{id : "logout"});
    },
    onSuccess: (data: any) => {
      if (data?.error) {
        toast.error(
          "We encountered an issue while logging you out. Please try again."
        );
      } else {
        toast.success("Successfully Logged Out !",{id : "logout"});
        router.push("/login");
      }
      setIsLoggingOut(false);
    },
    onError: (error: any) => {
      toast.error("Logout Failed !",{id : "logout"});
      setIsLoggingOut(false);
    },
  });
};

export default useLogout;
