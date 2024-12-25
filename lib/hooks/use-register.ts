import { useMutation } from "@tanstack/react-query";
import { emailPattern } from "@/lib/patterns";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/utils/api-call";
import { validatePattern } from "@/lib/utils";
import toast from "react-hot-toast";

const useRegister = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const { email, password, confirmPassword } = data;
      if (!validatePattern(email, emailPattern))
        return { error: "Provide valid email address !" };
      if (password !== confirmPassword)
        return { error: "Password and Confirm password not matched !" };
      const response = await registerUser({ email, password });
      return response;
    },
    onMutate: () => {
      toast.loading("We are processing !",{id : "register"});
    },
    onSuccess: (data: any) => {
      console.log({data})
      if (data?.error) {
        toast.error(data.error,{id : "register"});
      } else {
        toast.success(data.message,{id : "register"});
        router.push("/login");
      }
    },
    onError: (error: any) => {
      console.error("Registration Failed:", error);
      toast(error.message,{id : "register"});
    },
  });
};

export default useRegister;
