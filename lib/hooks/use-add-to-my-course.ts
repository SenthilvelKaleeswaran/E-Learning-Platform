import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addToMyCourse } from "@/lib/utils/api-call";

const useAddToMyCourse = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: string) => {
      return await addToMyCourse(id);
    },
    onMutate: () => {
      toast.loading("Please wait !", { id: "add-course" });
    },
    onSuccess: (data: any) => {
      console.log({ data });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Course added Successfully !", { id: "add-course" });
      }
      router.refresh()
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add Course", { id: "add-course" });
    },
  });
};

export default useAddToMyCourse;
