export const handleCourseCompletion = ({
  chapters,
  completedTopics,
  id,
  submit,
}: any) => {
  const topicId = chapters
    ?.map((item: any) => {
      return item?.topics?.map((topic: any) => {
        if (!completedTopics?.includes(topic?.id))
          return {
            topicId: topic?.id,
          };
      });
    })
    .flat()
    .filter((item: any) => Boolean(item));

  submit({
    id,
    status: "COMPLETED",
    completedTopics: { push: topicId },
  });
};
