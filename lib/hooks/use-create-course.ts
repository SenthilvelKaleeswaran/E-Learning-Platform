import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  createCustomCourse,
  updateCourse,
  deleteCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  createTopic,
  updateTopic,
  deleteTopic,
} from "@/lib/utils/api-call"; 
import { useRouter } from "next/navigation";
   

const useCreateCourse = () => {
  const router = useRouter()

  const handleMutate = (message: string, id: string) => {
    toast.loading(message, { id });
  };

  const handleSuccess = (data: any, successMessage: string, id: string) => {
    if (data?.error) {
      toast.error(data.error, { id });
    } else {
      toast.success(successMessage, { id });
    }
    router.refresh()
  };

  const handleError = (error: any, errorMessage: string, id: string) => {
    toast.error(error?.message || errorMessage, { id });
  };

  // Create Course
  const createCourseMutation = useMutation({
    mutationFn: createCustomCourse,
    onMutate: () => handleMutate("Creating Course...", "create-course"),
    onSuccess: (data) =>
      handleSuccess(data, "Course created successfully!", "create-course"),
    onError: (error) =>
      handleError(error, "Failed to create Course.", "create-course"),
  });

  // Update Course
  const updateCourseMutation = useMutation({
    mutationFn: updateCourse,
    onMutate: () => handleMutate("Updating Course...", "update-course"),
    onSuccess: (data) =>
      handleSuccess(data, "Course updated successfully!", "update-course"),
    onError: (error) =>
      handleError(error, "Failed to update Course.", "update-course"),
  });

  // Delete Course
  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onMutate: () => handleMutate("Deleting Course...", "delete-course"),
    onSuccess: (data) =>
      handleSuccess(data, "Course deleted successfully!", "delete-course"),
    onError: (error) =>
      handleError(error, "Failed to delete Course.", "delete-course"),
  });

  // Create Chapter
  const createChapterMutation = useMutation({
    mutationFn: createChapter,
    onMutate: () => handleMutate("Creating Chapter...", "create-chapter"),
    onSuccess: (data) =>
      handleSuccess(data, "Chapter created successfully!", "create-chapter"),
    onError: (error) =>
      handleError(error, "Failed to create Chapter.", "create-chapter"),
  });

  // Update Chapter
  const updateChapterMutation = useMutation({
    mutationFn: updateChapter,
    onMutate: () => handleMutate("Updating Chapter...", "update-chapter"),
    onSuccess: (data) =>
      handleSuccess(data, "Chapter updated successfully!", "update-chapter"),
    onError: (error) =>
      handleError(error, "Failed to update Chapter.", "update-chapter"),
  });

  // Delete Chapter
  const deleteChapterMutation = useMutation({
    mutationFn: deleteChapter,
    onMutate: () => handleMutate("Deleting Chapter...", "delete-chapter"),
    onSuccess: (data) =>
      handleSuccess(data, "Chapter deleted successfully!", "delete-chapter"),
    onError: (error) =>
      handleError(error, "Failed to delete Chapter.", "delete-chapter"),
  });

  // Create Topic
  const createTopicMutation = useMutation({
    mutationFn: createTopic,
    onMutate: () => handleMutate("Creating Topic...", "create-topic"),
    onSuccess: (data) =>
      handleSuccess(data, "Topic created successfully!", "create-topic"),
    onError: (error) =>
      handleError(error, "Failed to create Topic.", "create-topic"),
  });

  // Update Topic
  const updateTopicMutation = useMutation({
    mutationFn: updateTopic,
    onMutate: () => handleMutate("Updating Topic...", "update-topic"),
    onSuccess: (data) =>
      handleSuccess(data, "Topic updated successfully!", "update-topic"),
    onError: (error) =>
      handleError(error, "Failed to update Topic.", "update-topic"),
  });

  // Delete Topic
  const deleteTopicMutation = useMutation({
    mutationFn: deleteTopic,
    onMutate: () => handleMutate("Deleting Topic...", "delete-topic"),
    onSuccess: (data) =>
      handleSuccess(data, "Topic deleted successfully!", "delete-topic"),
    onError: (error) =>
      handleError(error, "Failed to delete Topic.", "delete-topic"),
  });


  return {
    createCourse: createCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    createChapter: createChapterMutation.mutate,
    updateChapter: updateChapterMutation.mutate,
    deleteChapter: deleteChapterMutation.mutate,
    createTopic: createTopicMutation.mutate,
    updateTopic: updateTopicMutation.mutate,
    deleteTopic: deleteTopicMutation.mutate,
    isCourseCreating: createCourseMutation.isPending,
    isCourseUpdating: updateCourseMutation.isPending,
    isCourseDeleting: deleteCourseMutation.isPending,
    isChapterCreating: createChapterMutation.isPending,
    isChapterUpdating: updateChapterMutation.isPending,
    isChapterDeleting: deleteChapterMutation.isPending,
    isTopicCreating: createTopicMutation.isPending,
    isTopicUpdating: updateTopicMutation.isPending,
    isTopicDeleting: deleteTopicMutation.isPending,
  };
};

export default useCreateCourse
