import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateMyCourse } from "@/lib/utils/api-call";

const useUpdateMyCourse = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      return await updateMyCourse(data);
    },
    onMutate: () => {
      toast.loading("Please wait !", { id: "edit-course" });
    },
    onSuccess: (data: any) => {
      console.log({ data });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Course Updated Successfully !", { id: "edit-course" });
      }
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to Update Course", {
        id: "edit-course",
      });
    },
  });
};

export default useUpdateMyCourse;
