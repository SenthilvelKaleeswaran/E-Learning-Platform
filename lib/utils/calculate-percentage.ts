export const calculateTotalTopics = (chapters: any) => {
  return chapters.reduce(
    (count: number, chapter: { topics: any[] }) =>
      count + chapter.topics.length,
    0
  );
};

export const formatCourseData = (course: any, details: any) => {
  const totalTopics = calculateTotalTopics(course.chapters);

  return {
    ...course,
    myCourseId: details?.id,
    status: details?.status,
    completedPercentage: (details?.length / totalTopics) * 100 || 0,
  };
};
