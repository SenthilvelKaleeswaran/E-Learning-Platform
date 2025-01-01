import { useMutation } from "@tanstack/react-query";
import { validatePattern } from "@/lib/utils";
import { emailPattern } from "@/lib/patterns";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      const { email, password } = data;
      if (!validatePattern(email, emailPattern))
        return { error: "Provide valid email address !" };
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return response;
    },
    onMutate: () => {
      toast.loading("We are processing !",{id : "login"});
    },
    onSuccess: (data: any) => {
      console.log({data})
      if (data?.error) {
        toast.error(data.error,{id : "login"});
      } else {
        toast.success("Logged in Successfully !",{id : "login"});
        router.replace("/course-library");
        router.refresh();
      }
    },
    onError: (error: any) => {
      console.error("Registration Failed:", error);
      toast.error(error.message,{id : "login"});
    },
  });
};

export default useLogin;
