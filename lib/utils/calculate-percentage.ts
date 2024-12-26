export const formatCourseData = (course: any, details: any) => {
  const totalTopics = course.chapters.reduce(
    (count: number, chapter: { topics: any[] }) =>
      count + chapter.topics.length,
    0
  );

  return {
    ...course,
    myCourseId: details?.id,
    status: details?.status,
    completedPercentage: (details?.length / totalTopics) * 100 || 0,
  };
};
